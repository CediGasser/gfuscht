import { describe, it, expect } from "vitest";
import Wfc, { generateTiles, reverseSocket, type RawTile } from "./wfc";
import fullTiles from "./tilesets/tiles.json";
import pinkTiles from "./tilesets/less_tiles.json";

// Two tiles that can never sit next to each other (or themselves)
const incompatible: RawTile[] = [
  { name: "a", sockets: ["a", "b", "c", "d"], rotationVariants: [0] },
  { name: "b", sockets: ["a", "b", "c", "d"], rotationVariants: [0] },
];

describe("generateTiles", () => {
  it("rotates sockets clockwise", () => {
    const tiles = generateTiles([
      { name: "t", sockets: ["T", "R", "B", "L"], rotationVariants: [0, 90, 180, 270] },
    ]);
    expect(tiles.map((t) => t.sockets.join(""))).toEqual(["TRBL", "LTRB", "BLTR", "RBLT"]);
    expect(tiles.map((t) => t.rotation)).toEqual([0, 90, 180, 270]);
  });
});

describe("split sockets", () => {
  // Corners top-left, top-right, bottom-right, bottom-left to clockwise edges
  const fromCorners = ([tl, tr, br, bl]: string[]) => [`${tl}|${tr}`, `${tr}|${br}`, `${br}|${bl}`, `${bl}|${tl}`];
  // Rotating the image 90° clockwise moves the bottom-left corner to the top-left
  const rotateCorners = (corners: string[], rotation: number) => {
    let result = corners;
    for (let r = 0; r < rotation; r += 90) result = [result[3], result[0], result[1], result[2]];
    return result;
  };

  it("reverses split sockets", () => {
    expect(reverseSocket("G|S")).toBe("S|G");
    expect(reverseSocket("G|r|S")).toBe("S|r|G");
    expect(reverseSocket("p2")).toBe("p2");
  });

  it("matches rotated corner tiles exactly when their shared corners agree", () => {
    const shapes = [
      ["G", "G", "S", "S"],
      ["G", "G", "G", "S"],
      ["G", "S", "S", "S"],
    ];
    const raw: RawTile[] = shapes.map((corners, i) => ({
      name: `shape${i}`,
      sockets: fromCorners(corners),
      rotationVariants: [0, 90, 180, 270],
    }));
    const corners = raw.flatMap((tile, i) => tile.rotationVariants.map((r) => rotateCorners(shapes[i], r)));

    const wfc = new Wfc(raw, 2, 1, 1);
    for (let a = 0; a < wfc.tiles.length; a++) {
      wfc.cells = [[a], wfc.tiles.map((_, i) => i)];
      wfc.reduce({ x: 1, y: 0 });
      const expected = corners
        .map((c, b) => (c[0] === corners[a][1] && c[3] === corners[a][2] ? b : -1))
        .filter((b) => b >= 0);
      expect(wfc.cells[1]).toEqual(expected);
    }
  });
});

describe("Wfc", () => {
  it("is deterministic for a seed", () => {
    const a = new Wfc(fullTiles, 8, 8, 1234);
    const b = new Wfc(fullTiles, 8, 8, 1234);
    expect(a.run()).toEqual(b.run());
    expect(a.cells).toEqual(b.cells);
  });

  it("fully collapses a tileset that cannot contradict", () => {
    for (const seed of [1, 2, 3, 4, 5]) {
      const wfc = new Wfc(pinkTiles, 10, 10, seed);
      expect(wfc.run()).toBe("done");
      expect(wfc.cells.every((cell) => cell.length === 1)).toBe(true);
    }
  });

  it("stops at a contradiction and reports it", () => {
    const wfc = new Wfc(incompatible, 2, 1, 42);
    const steps = [...wfc.steps()];
    expect(steps.map((s) => s.type)).toEqual(["collapse", "contradiction"]);

    const contradiction = steps[1];
    if (contradiction.type !== "contradiction") throw new Error("unreachable");
    expect(wfc.cellAt(contradiction.pos)).toEqual([]);
    expect(contradiction.removed).toEqual([0, 1]);
  });

  it("explains why a cell has no options left", () => {
    const wfc = new Wfc(incompatible, 2, 1, 42);
    wfc.run();
    const empty = wfc.cells.findIndex((cell) => cell.length === 0);
    const inspection = wfc.inspect({ x: empty % 2, y: 0 });

    expect(inspection.options).toEqual([]);
    const blockingSide = empty === 1 ? "left" : "right";
    expect(inspection.verdicts.every((v) => v.blockedBy.includes(blockingSide))).toBe(true);
    expect(inspection.sides.find((s) => s.side === "top")?.allowed).toBeNull();
  });

  it("restores a saved state", () => {
    const wfc = new Wfc(fullTiles, 6, 6, 7);
    const steps = wfc.steps();
    for (let i = 0; i < 20; i++) steps.next();
    const state = wfc.getState();
    const expected = (() => {
      wfc.run();
      return wfc.cells.slice();
    })();

    wfc.setState(state);
    wfc.run();
    expect(wfc.cells).toEqual(expected);
  });

  it("shifts cells and the propagation stack", () => {
    const wfc = new Wfc(pinkTiles, 3, 2, 1);
    wfc.cells = [[0], [1], [2], [3], [4], [5]];
    wfc.stack = [{ x: 1, y: 0 }, { x: 0, y: 1 }];

    wfc.shift("right");

    const all = wfc.tiles.map((_, i) => i);
    expect(wfc.cells).toEqual([[1], [2], all, [4], [5], all]);
    expect(wfc.stack).toEqual([{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }]);

    wfc.shift("up");
    expect(wfc.cells).toEqual([all, all, all, [1], [2], all]);
  });
});

describe("weights", () => {
  it("prefers heavier tiles when collapsing", () => {
    const tiles: RawTile[] = [
      { name: "rare", sockets: ["a", "a", "a", "a"], rotationVariants: [0] },
      { name: "common", sockets: ["a", "a", "a", "a"], rotationVariants: [0], weight: 9 },
    ];
    const wfc = new Wfc(tiles, 20, 20, 3);
    wfc.run();
    const common = wfc.cells.filter((cell) => cell[0] === 1).length;
    expect(common / wfc.cells.length).toBeGreaterThan(0.8);
  });
});
