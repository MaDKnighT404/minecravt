import { create } from 'zustand';
import { nanoid } from 'nanoid';

type Cube = {
  key: string;
  pos: [number, number, number];
  texture: string;
};

type Store = {
  texture: string;
  cubes: Cube[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: () => void;
  setTexture: () => void;
  saveWorld: () => void;
  resetWorld: () => void;
};

export const useStore = create<Store>((set) => ({
  texture: 'dirt',
  cubes: [{ key: nanoid(), pos: [1, 0.5, -4], texture: 'dirt' }],
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [...prev.cubes, { key: nanoid(), pos: [x, y, z], texture: prev.texture }],
    }));
  },
  removeCube: () => {},
  setTexture: () => {},
  saveWorld: () => {},
  resetWorld: () => {},
}));
