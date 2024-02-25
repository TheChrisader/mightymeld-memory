import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { GoSun, GoMoon } from "react-icons/go";

import { useThemeStore } from "../store/themeStore.js";
import { cn } from "../lib/utils.js";

//prettier-ignore
const Switch = React.forwardRef(({ className, ...props }, ref) => { //eslint-disable-line
  const setTheme = useThemeStore((state) => state.setTheme);
  const isLightTheme = useThemeStore((state) => state.isLightTheme);
  const switchRef = React.useRef(null);
  const thumbRef = React.useRef(null);

  React.useEffect(() => {
    switchRef.current.setAttribute(
      "data-state",
      isLightTheme ? "unchecked" : "checked"
    );
    thumbRef.current.setAttribute(
      "data-state",
      isLightTheme ? "unchecked" : "checked"
    );
    switchRef.current.setAttribute(
      "aria-checked",
      isLightTheme ? "false" : "true"
    );
    switchRef.current.setAttribute("value", isLightTheme ? "off" : "on");
  }, [isLightTheme]);

  return (
    <SwitchPrimitives.Root
      onClick={setTheme}
      className={cn(
        "peer group relative inline-flex h-[50px] w-[100px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-switchChecked data-[state=unchecked]:bg-switchUnchecked",
        className
      )}
      {...props}
      ref={switchRef}
    >
      <SwitchPrimitives.Thumb
        ref={thumbRef}
        className={cn(
          "pointer-events-none block size-[40px] rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[52px] data-[state=unchecked]:translate-x-1"
        )}
      />
      <GoSun
        className={`absolute size-5 left-[13px] group-data-[state=unchecked]:scale-[1.2] fill-gray-600 ${
          !isLightTheme ? "fill-white" : ""
        }`}
      />
      <GoMoon className="absolute size-5 right-[15px] group-data-[state=checked]:scale-[1.2] group-data-[state=checked]:fill-gray-600 " />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
