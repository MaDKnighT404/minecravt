import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <Sky sunPosition={[100, 100, 200]} />
      </Canvas>
    </div>
  );
}

export default App;
