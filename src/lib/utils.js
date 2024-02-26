import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isTouchDevice =
  "ontouchstart" in window ||
  navigator.MaxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;
