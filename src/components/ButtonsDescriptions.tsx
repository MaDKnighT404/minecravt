import { useKeyboard } from '../hooks/useKeyboard';
import { useMouse } from '../hooks/useMouse';
import { dirtImg, grassImg, glassImg, logImg, woodImg } from '../assets/images/images';

export const ButtonsDescriptions = () => {
  const isClicking = useMouse();

  const {
    moveBackward,
    moveForward,
    moveRight,
    moveLeft,
    jump,
    remove,
    dirt,
    grass,
    glass,
    wood,
    log,
  } = useKeyboard();

  return (
    <div className="absolute buttons-description top-right">
      <h3>Buttons</h3>
      <ul className="buttons-list flex col">
        <li>
          <span className={`${moveForward && 'activeBtn'}`}>W</span>: move forward
        </li>
        <li>
          <span className={`${moveBackward && 'activeBtn'}`}>S</span>: move backward
        </li>
        <li>
          <span className={`${moveLeft && 'activeBtn'}`}>A</span>: move left
        </li>
        <li>
          <span className={`${moveRight && 'activeBtn'}`}>D</span>: move right
        </li>
        <li>
          <span className={`${jump && 'activeBtn'}`}>Space</span>: Jump
        </li>
        <li>
          <span className={`${remove && 'activeBtn'}`}>Alt (Hold)</span> +
          <span className={`${isClicking && 'activeBtn'}`}>click</span>: remove block
        </li>
      </ul>
      <h3>Select block:</h3>
      <ul className="buttons-list flex row">
        <li className="button-img">
          <span className={`${dirt && 'activeBtn'}`}>1</span>
          <img
            src={dirtImg}
            alt="dirt"
          />
        </li>

        <li className="button-img">
          <span className={`${grass && 'activeBtn'}`}>2</span>
          <img
            src={grassImg}
            alt="grass"
          />
        </li>

        <li className="button-img">
          <span className={`${glass && 'activeBtn'}`}>3</span>
          <img
            src={glassImg}
            alt="glass"
          />
        </li>

        <li className="button-img">
          <span className={`${wood && 'activeBtn'}`}>4</span>
          <img
            src={woodImg}
            alt="wood"
          />
        </li>

        <li className="button-img">
          <span className={`${log && 'activeBtn'}`}>5</span>
          <img
            src={logImg}
            alt="log"
          />
        </li>
      </ul>
    </div>
  );
};
