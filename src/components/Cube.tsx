import { useBox } from '@react-three/cannon';
import * as textures from '../assets/images/textures';
import { Mesh } from 'three';

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

  const activeTexture = textures[texture + 'Texture' as keyof typeof textures];
  console.log(activeTexture);
  return (
    <mesh ref={ref as React.Ref<Mesh>}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        map={activeTexture}
      />
    </mesh>
  );
};
