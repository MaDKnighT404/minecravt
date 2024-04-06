import { usePlane } from '@react-three/cannon';
import { Mesh } from 'three';
import { groundTexture } from '../assets/images/textures';

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  groundTexture.repeat.set(100, 100);

  return (
    <mesh ref={ref as React.Ref<Mesh>}>
      <planeGeometry
        attach="geometry"
        args={[100, 100]}
      />
      <meshStandardMaterial
        attach="material"
        map={groundTexture}
      />
    </mesh>
  );
};
