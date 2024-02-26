import { useState, useEffect } from "react";

const useMousePosition = (size) => {
  const [position, setPosition] = useState({
    clientX: 0,
    clientY: 0,
  });

  const updatePosition = (event) => {
    let { pageX, pageY, clientX, clientY } = event;

    clientX = clientX - size / 2;
    clientY = clientY - size / 2;

    setPosition({
      clientX,
      clientY,
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", updatePosition, false);
    document.addEventListener("mouseenter", updatePosition, false);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", updatePosition);
    };
  }, []);

  return position;
};

export default useMousePosition;
