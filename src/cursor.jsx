import useMousePosition from "./hooks/useMousePosition";
import { CursorContext } from "./context/cursorContext";
import { useContext } from "react";
import { isTouchDevice } from "./lib/utils";

export const Cursor = () => {
  let { clientX, clientY } = useMousePosition(70);
  const [cursor] = useContext(CursorContext);

  if (isTouchDevice) {
    return <></>;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <svg
        width={70}
        height={70}
        viewBox="0 0 70 70"
        style={{
          position: "absolute",
          transform: `translate(${clientX}px, ${clientY}px) scale(${
            cursor.active ? 3.5 : 1
          })`,
          strokeWidth: 1,
          fill: cursor.active
            ? "rgba(4, 4, 121, 0.3)"
            : "rgba(158, 154, 235, 0.397)",
          transition: "transform 1.5s cubic-bezier(0.19, 2.58, 0.53, 0.52)",
        }}
      >
        <circle
          id="cursor"
          className="opacity-0 transition-opacity duration-[2s]"
          style={{ mixBlendMode: cursor.active ? "color-dodge" : "normal" }}
          cx="35"
          cy="35"
          r="12"
        />
      </svg>
    </div>
  );
};
