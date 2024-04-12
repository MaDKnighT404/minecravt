import { useEffect } from 'react';
import { useStore } from '../hooks/useStore';
import { useKeyboard } from '../hooks/useKeyboard';
import { dirtImg, grassImg, glassImg, logImg, woodImg } from '../assets/images/images';

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export const TextureSelector = () => {
  const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };
    const pressedTexture = Object.entries(textures).find(([_, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, grass, glass, wood, log]);

  return (
    <div className="absolute bottom texture-selector">
      {Object.entries(images).map(([k, src], i) => {
        return (
          <div
            className="image-container"
            key={k}>
            <span className={`image-number ${k === activeTexture ? 'active' : ''}`}>{i + 1}</span>
            <img
              src={src}
              alt={k}
              className={`block-image ${k === activeTexture ? 'active' : ''}`}
            />
          </div>
        );
      })}
    </div>
  );
};
