import { useState } from 'react';
import { useStore } from '../hooks/useStore';

export const Menu = () => {
  const [saveWorld, resetWorld] = useStore((state) => [state.saveWorld, state.resetWorld]);
  const [isShowMessage, setIsShowMessage] = useState(false);

  return (
    <>
      <div className="menu absolute">
        <button
          className="menuBtn"
          onClick={() => {
            saveWorld();
            setIsShowMessage(true);
            setTimeout(() => {
              setIsShowMessage(false);
            }, 2500);
          }}>
          Save
        </button>
        <button
          className="menuBtn"
          onClick={() => resetWorld()}>
          Reset
        </button>
      </div>
      {isShowMessage && (
        <div className="absolute top">
          <p className="message">The world has been saved</p>
        </div>
      )}
    </>
  );
};
