import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Mesh, Vector3 } from 'three';
import { useEffect, useRef } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';
import { useStore } from '../hooks/useStore';

const JUMP_FORCE = 8;
const SPEED = 7;

export const Player = () => {
  const { camera } = useThree();
  const { moveBackward, moveForward, moveRight, moveLeft, jump } = useKeyboard();
  const playerPosition = JSON.parse(localStorage.getItem('playerPosition') || '[0, 1, 0]');
  const playerView = JSON.parse(localStorage.getItem('playerView') || '[0, 0, 0]');
  const setPlayerPosition = useStore((state) => state.setPlayerPosition);
  const setPlayerView = useStore((state) => state.setPlayerView);

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: playerPosition,
  }));

  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p;
    });
  }, [api.position]);

  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => {
      vel.current = v;
    });
  }, [api.velocity]);

  useEffect(() => {
    camera.position.set(playerPosition[0], playerPosition[1], playerPosition[2]);
    camera.rotation.set(playerView[0], playerView[1], playerView[2]);
    camera.updateMatrix();
  }, [camera]);

  const lastUpdateTime = useRef(performance.now());
  useFrame(() => {
    const currentTime = performance.now();
    if (currentTime - lastUpdateTime.current > 1000) {
      // Обновляем стор раз в секунду
      lastUpdateTime.current = currentTime;
      setPlayerPosition(pos.current as [number, number, number]);
      setPlayerView([camera.rotation.x, camera.rotation.y, camera.rotation.z]);
    }
    camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));

    const direction = new Vector3();

    const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0));

    const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1]) < 0.01) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  return <mesh ref={ref as React.Ref<Mesh>}></mesh>;
};
