import { describe, it, expect } from "vitest";
import WfcPlayer from "./WfcPlayer.svelte";
import Wfc from "./wfc";
import biomes from "./tilesets/biomes.json";

// The grid after `count` steps of a fresh solver with the same seed
function replay(seed: number, count: number) {
  const wfc = new Wfc(biomes, 12, 12, seed);
  const steps = wfc.steps();
  for (let i = 0; i < count; i++) steps.next();
  return wfc.cells;
}

describe("WfcPlayer", () => {
  it("rebuilds every point of the history", () => {
    const player = new WfcPlayer(biomes, 12, 12, 5);
    player.toEnd();
    const last = player.historyLength - 1;
    expect(last).toBeGreaterThan(200);

    for (const index of [0, 1, 63, 64, 65, 130, last - 1, last]) {
      player.seek(index);
      expect(player.current.cells).toEqual(replay(5, index));
    }
  });

  it("continues from a rewound point when walking", () => {
    const player = new WfcPlayer(biomes, 12, 12, 5);
    player.toEnd();
    player.seek(100);
    const before = player.current.cells;

    player.shift("right");
    expect(player.historyLength).toBe(102);
    expect(player.current.cells.slice(0, 11)).toEqual(before.slice(1, 12));

    player.stepBack();
    expect(player.current.cells).toEqual(before);
  });

  it("resizes on reset", () => {
    const player = new WfcPlayer(biomes, 12, 12, 5);
    player.reset(biomes, 5, 30, 20);
    expect(player.current.cells).toHaveLength(600);
    expect(player.width).toBe(30);
  });
});
