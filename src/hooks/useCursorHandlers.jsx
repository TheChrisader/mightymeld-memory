import { useContext, useCallback } from "react";
import { CursorContext } from "../context/cursorContext";
import { isTouchDevice } from "../lib/utils";

export const useCursorHandlers = (options = {}) => {
  const [, setCursor] = useContext(CursorContext);

  const toggleCursor = (bool) => {
    setCursor(() => ({ active: bool }));
  };

  const onMouseEnter = useCallback((event) => {
    if (options.onMouseEnter) {
      options.onMouseEnter(event);
    }
    toggleCursor(true);
  }, []); // eslint-disable-line

  const onMouseLeave = useCallback((event) => {
    if (options.onMouseLeave) {
      options.onMouseLeave(event);
    }
    toggleCursor(false);
  }, []); // eslint-disable-line

  if (isTouchDevice) {
    if (options.returnToggle) {
      return [() => {}, {}];
    } else {
      return {};
    }
  }

  if (options.returnToggle) {
    return [toggleCursor, { onMouseEnter, onMouseLeave }];
  }

  return { onMouseEnter, onMouseLeave };
};
