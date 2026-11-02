import Wfc, {
  type Cell,
  type Direction,
  type Position,
  type RawTile,
  type WfcResult,
  type WfcState,
  type WfcStep,
} from "./wfc";

export type Snapshot = WfcState & { step: WfcStep | null };
export type Status = "running" | "done" | "contradiction";

/** What a step changed: the cells it replaced, plus the rest of the solver state after it */
type HistoryEntry = {
  step: WfcStep | null;
  changes: [index: number, cell: Cell][];
  stack: Position[];
  rngState: number;
};

const MAX_HISTORY = 20_000;
// Every KEYFRAME_INTERVAL steps the full grid is stored, other steps only store their changes
const KEYFRAME_INTERVAL = 64;
const HISTORY_TRIM = KEYFRAME_INTERVAL * 16;
const MAX_STEPS_PER_FRAME = 2_000;
const MAX_STEPS_TO_END = 1_000_000;

/**
 * Drives a Wfc generator step by step and records every step, so the run can be
 * played, paused, stepped and scrubbed back and forth.
 */
export default class WfcPlayer {
  #wfc: Wfc;
  #steps: Generator<WfcStep, WfcResult>;
  // Plain arrays on purpose: entries are immutable, #version signals changes
  #history: HistoryEntry[] = [];
  /** Full grids by absolute step number (history index + trimmed) */
  #keyframes = new Map<number, Cell[]>();
  #version = $state(0);
  #frame: number | null = null;
  #lastTime = 0;
  #budget = 0;

  width = $state(0);
  height = $state(0);

  seed = $state(0);
  cursor = $state(0);
  playing = $state(false);
  /** Steps per second */
  speed = $state(30);
  /** How the generator ended, null while it can still produce steps */
  result: WfcResult | null = $state(null);
  /** Number of snapshots dropped from the start of the history */
  trimmed = $state(0);

  historyLength = $derived.by(() => (this.#version, this.#history.length));
  current: Snapshot = $derived.by(() => (this.#version, this.#snapshot(this.cursor)));
  atHead = $derived(this.cursor === this.historyLength - 1);
  status: Status = $derived.by(() => {
    if (this.current.step?.type === "contradiction") return "contradiction";
    if (this.atHead && this.result === "done") return "done";
    return "running";
  });

  constructor(tileset: RawTile[], width: number, height: number, seed: number) {
    this.#wfc = new Wfc(tileset, width, height, seed);
    this.#steps = this.#wfc.steps();
    this.reset(tileset, seed, width, height);
  }

  get tiles() {
    return this.#wfc.tiles;
  }

  reset(tileset: RawTile[], seed: number, width = this.width, height = this.height) {
    this.seed = seed;
    this.width = width;
    this.height = height;
    this.#wfc = new Wfc(tileset, width, height, seed);
    this.#steps = this.#wfc.steps();
    this.#history = [{ step: null, changes: [], stack: [], rngState: this.#wfc.rngState }];
    this.#keyframes = new Map([[0, this.#wfc.cells.slice()]]);
    this.cursor = 0;
    this.trimmed = 0;
    this.result = null;
    this.#version++;
  }

  #record(step: WfcStep) {
    const wfc = this.#wfc;
    const stack = wfc.stack.slice();
    let changes: HistoryEntry["changes"] = [];
    if (step.type === "shift") changes = wfc.cells.map((cell, i) => [i, cell]);
    else if (step.type === "collapse" || step.removed.length > 0) changes = [[wfc.index(step.pos), wfc.cellAt(step.pos)]];

    this.#history.push({ step, changes, stack, rngState: wfc.rngState });
    const absolute = this.trimmed + this.#history.length - 1;
    if (absolute % KEYFRAME_INTERVAL === 0) this.#keyframes.set(absolute, wfc.cells.slice());

    if (this.#history.length > MAX_HISTORY) {
      this.#history.splice(0, HISTORY_TRIM);
      this.trimmed += HISTORY_TRIM;
      for (const key of this.#keyframes.keys()) if (key < this.trimmed) this.#keyframes.delete(key);
    }
    this.cursor = this.#history.length - 1;
    this.#version++;
  }

  /** Rebuilds the solver state after the step at `index` from the nearest keyframe before it */
  #snapshot(index: number): Snapshot {
    const entry = this.#history[index];
    let cells: Cell[];
    if (index === this.#history.length - 1) {
      // The solver itself is at the head
      cells = this.#wfc.cells.slice();
    } else {
      const absolute = this.trimmed + index;
      const keyframe = absolute - (absolute % KEYFRAME_INTERVAL);
      cells = this.#keyframes.get(keyframe)!.slice();
      for (let i = keyframe + 1 - this.trimmed; i <= index; i++) {
        for (const [cell, options] of this.#history[i].changes) cells[cell] = options;
      }
    }
    return { cells, stack: entry.stack, rngState: entry.rngState, step: entry.step };
  }

  /** Replays the next recorded step, or computes a new one at the head. Returns false if there is none. */
  stepForward() {
    if (!this.atHead) {
      this.cursor++;
      return true;
    }
    if (this.result) return false;

    const next = this.#steps.next();
    if (next.done) {
      this.result = next.value;
      return false;
    }
    if (next.value.type === "contradiction") this.result = "contradiction";
    this.#record(next.value);
    return true;
  }

  stepBack() {
    if (this.cursor > 0) this.cursor--;
  }

  seek(index: number) {
    this.cursor = Math.max(0, Math.min(index, this.historyLength - 1));
  }

  toStart() {
    this.pause();
    this.cursor = 0;
  }

  /** Jumps to the latest step, or runs to the end if already there. */
  toEnd() {
    if (!this.atHead) {
      this.cursor = this.historyLength - 1;
      return;
    }
    for (let i = 0; i < MAX_STEPS_TO_END && this.stepForward(); i++);
  }

  /**
   * Keeps playing until paused or a contradiction happens. When the run is done the
   * loop idles but stays playing, so walking afterwards continues generating.
   */
  play() {
    this.playing = true;
    this.#startLoop();
  }

  #startLoop() {
    if (this.#frame !== null) return;
    this.#budget = 0;
    this.#lastTime = performance.now();
    this.#frame = requestAnimationFrame(this.#tick);
  }

  pause() {
    this.playing = false;
    if (this.#frame !== null) cancelAnimationFrame(this.#frame);
    this.#frame = null;
  }

  toggle() {
    if (this.playing) this.pause();
    else this.play();
  }

  #tick = (time: number) => {
    this.#budget = Math.min(this.#budget + ((time - this.#lastTime) / 1000) * this.speed, MAX_STEPS_PER_FRAME);
    this.#lastTime = time;

    for (; this.#budget >= 1; this.#budget--) {
      if (!this.stepForward()) {
        // Nothing left to do: idle until a shift restarts the loop
        this.#frame = null;
        return;
      }
      if (this.#history[this.cursor].step?.type === "contradiction") {
        this.pause();
        return;
      }
    }
    this.#frame = requestAnimationFrame(this.#tick);
  };

  /**
   * Shifts the grid. When rewound, the steps after the current one are discarded
   * and the run continues from here.
   */
  shift(direction: Direction) {
    if (!this.atHead) {
      const state = this.current;
      this.#history.length = this.cursor + 1;
      for (const key of this.#keyframes.keys()) if (key > this.trimmed + this.cursor) this.#keyframes.delete(key);
      this.#wfc.setState(state);
    }
    this.#wfc.shift(direction);
    this.#steps = this.#wfc.steps();
    this.result = null;
    this.#record({ type: "shift", direction });
    if (this.playing) this.#startLoop();
  }

  inspect(pos: Position) {
    return this.#wfc.inspect(pos, this.current.cells);
  }
}
