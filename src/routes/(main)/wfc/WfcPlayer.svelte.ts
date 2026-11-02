import Wfc, {
  type Direction,
  type Position,
  type RawTile,
  type WfcResult,
  type WfcState,
  type WfcStep,
} from "./wfc";

export type Snapshot = WfcState & { step: WfcStep | null };
export type Status = "running" | "done" | "contradiction";

const MAX_HISTORY = 20_000;
const HISTORY_TRIM = 1_000;
const MAX_STEPS_PER_FRAME = 2_000;
const MAX_STEPS_TO_END = 200_000;

/**
 * Drives a Wfc generator step by step and records a snapshot after every step,
 * so the run can be played, paused, stepped and scrubbed back and forth.
 */
export default class WfcPlayer {
  #wfc: Wfc;
  #steps: Generator<WfcStep, WfcResult>;
  // Plain array on purpose: snapshots are immutable, #version signals changes
  #history: Snapshot[] = [];
  #version = $state(0);
  #frame: number | null = null;
  #lastTime = 0;
  #budget = 0;

  readonly width: number;
  readonly height: number;

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
  current = $derived.by(() => (this.#version, this.#history[this.cursor]));
  atHead = $derived(this.cursor === this.historyLength - 1);
  status: Status = $derived.by(() => {
    if (this.current.step?.type === "contradiction") return "contradiction";
    if (this.atHead && this.result === "done") return "done";
    return "running";
  });

  constructor(tileset: RawTile[], width: number, height: number, seed: number) {
    this.width = width;
    this.height = height;
    this.#wfc = new Wfc(tileset, width, height, seed);
    this.#steps = this.#wfc.steps();
    this.reset(tileset, seed);
  }

  get tiles() {
    return this.#wfc.tiles;
  }

  reset(tileset: RawTile[], seed: number) {
    this.seed = seed;
    this.#wfc = new Wfc(tileset, this.width, this.height, seed);
    this.#steps = this.#wfc.steps();
    this.#history = [{ ...this.#wfc.getState(), step: null }];
    this.cursor = 0;
    this.trimmed = 0;
    this.result = null;
    this.#version++;
  }

  #record(step: WfcStep) {
    this.#history.push({ ...this.#wfc.getState(), step });
    if (this.#history.length > MAX_HISTORY) {
      this.#history.splice(0, HISTORY_TRIM);
      this.trimmed += HISTORY_TRIM;
    }
    this.cursor = this.#history.length - 1;
    this.#version++;
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
      if (this.current.step?.type === "contradiction") {
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
      this.#history.length = this.cursor + 1;
      this.#wfc.setState(this.current);
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
