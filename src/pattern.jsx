import { useCustomizationStore } from "./store/customizationStore";

export const Pattern = () => {
  const background = useCustomizationStore((state) => state.background);
  return <div className={`pattern ${background}`}></div>;
};
