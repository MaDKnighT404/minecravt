import { useBox } from '@react-three/cannon';
import * as textures from '../assets/images/textures';
import { Mesh } from 'three';
import { useStore } from '../hooks/useStore';
import { useState } from 'react';

type Position = [number, number, number];

type CubeProps = {
  position: Position;
  texture: string;
};

export const Cube = ({ position, texture }: CubeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }));

  const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);

  const activeTexture = textures[(texture + 'Texture') as keyof typeof textures];
  return (
    <mesh
      ref={ref as React.Ref<Mesh>}
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
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
        transparent={true}
        opacity={texture === 'glass' ? 0.75 : 1}
        color={isHovered ? '#c2c2c2' : 'white'}
      />
    </mesh>
  );
};
