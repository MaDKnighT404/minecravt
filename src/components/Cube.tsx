import { useBox } from '@react-three/cannon';
import * as textures from '../assets/images/textures';
import { Mesh } from 'three';
import { useStore } from '../hooks/useStore';

type Position = [number, number, number];

type CubeProps = {
  position: Position;
  texture: string;
};

export const Cube = ({ position, texture }: CubeProps) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }));

  const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);

  const activeTexture = textures[(texture + 'Texture') as keyof typeof textures];
  return (
    <mesh
      ref={ref as React.Ref<Mesh>}
      onClick={(e) => {
        e.stopPropagation();
        if (e.faceIndex === undefined) return;
        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current!.position;

        if (e.altKey) {
          removeCube(x, y, z);
          return;
        }

        if (clickedFace === 0) {
          addCube(x + 1, y, z);
          return;
        }
        if (clickedFace === 1) {
          addCube(x - 1, y, z);
          return;
        }
        if (clickedFace === 2) {
          addCube(x, y + 1, z);
          return;
        }
        if (clickedFace === 3) {
          addCube(x, y - 1, z);
          return;
        }
        if (clickedFace === 4) {
          addCube(x, y, z + 1);
          return;
        }
        if (clickedFace === 5) {
          addCube(x, y, z - 1);
          return;
        }
      }}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        map={activeTexture}
      />
    </mesh>
  );
};
