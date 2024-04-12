import { useState, useEffect } from 'react';

export const useMouse = () => {
  const [mouseButtons, setMouseButtons] = useState({
    isLeftClicking: false,
    isMiddleClicking: false,
    isRightClicking: false
  });

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setMouseButtons(prevState => ({
        ...prevState,
        isLeftClicking: event.button === 0 ? true : prevState.isLeftClicking,
        isMiddleClicking: event.button === 1 ? true : prevState.isMiddleClicking,
        isRightClicking: event.button === 2 ? true : prevState.isRightClicking,
      }));
    };

    const handleMouseUp = (event: MouseEvent) => {
      setMouseButtons(prevState => ({
        ...prevState,
        isLeftClicking: event.button === 0 ? false : prevState.isLeftClicking,
        isMiddleClicking: event.button === 1 ? false : prevState.isMiddleClicking,
        isRightClicking: event.button === 2 ? false : prevState.isRightClicking,
      }));
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return mouseButtons;
};
