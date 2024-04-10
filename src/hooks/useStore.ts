import { create } from 'zustand';
import { nanoid } from 'nanoid';

type Cube = {
  key: string;
  pos: [number, number, number];
  texture: string;
};

type Store = {
  texture: string;
  playerPosition: [number, number, number];
  playerView: [number, number, number];
  cubes: Cube[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
  setTexture: (texture: string) => void;
  saveWorld: () => void;
  resetWorld: () => void;
  setPlayerPosition: (pos: [number, number, number]) => void;
  setPlayerView: (view: [number, number, number]) => void;
};

const getLocalStorage = <T>(key: string): T | null => {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const setLocalStorage = <T>(key: string, value: T): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const useStore = create<Store>((set) => ({
  texture: 'dirt',
  playerPosition: getLocalStorage('playerPosition') || [0, 1, 0],
  playerView: getLocalStorage('playerView') || [0, 0, 0],
  cubes: getLocalStorage('cubes') || [],
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [...prev.cubes, { key: nanoid(), pos: [x, y, z], texture: prev.texture }],
    }));
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter(
        (cube) => cube.pos[0] !== x || cube.pos[1] !== y || cube.pos[2] !== z
      ),
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  setPlayerPosition: (pos) => {
    set(() => ({
      playerPosition: pos,
    }));
  },
  setPlayerView: (view) => {
    set(() => ({
      playerView: view,
    }));
  },
  saveWorld: () => {
    set((prev) => {
      setLocalStorage('cubes', prev.cubes);
      setLocalStorage('playerPosition', prev.playerPosition);
      setLocalStorage('playerView', prev.playerView);
      return prev;
    });
  },
  resetWorld: () => {
    set(() => {
      setLocalStorage('playerPosition', [0, 1, 0]);
      setLocalStorage('playerView', [0, 0, 0]);
      setLocalStorage('cubes', []);
      return {
        texture: 'dirt',
        cubes: [],
      };
    });
  },
}));
