import type { RawTile } from "../wfc";
import directedTiles from "./directed_tiles.json";
import allTiles from "./tiles.json";
import pinkTiles from "./less_tiles.json";
import biomeTiles from "./biomes.json";

export type Tileset = {
  id: string;
  label: string;
  tiles: RawTile[];
  /** URL prefix for the tile images, the tile name is appended */
  imageBase: string;
};

export const tilesets: Tileset[] = [
  { id: "directed", label: "Directed", tiles: directedTiles, imageBase: "/wfc-images/" },
  { id: "all", label: "All rotations", tiles: allTiles, imageBase: "/wfc-images/" },
  { id: "pink", label: "Pink only", tiles: pinkTiles, imageBase: "/wfc-images/" },
  { id: "biomes", label: "Biomes", tiles: biomeTiles, imageBase: "/wfc-images/biomes/" },
];

export const getTileset = (id: string | null) => tilesets.find((t) => t.id === id) ?? tilesets[0];
