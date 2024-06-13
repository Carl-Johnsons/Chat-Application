import { ScreenSectionContext } from "@/contexts";
import { useContext } from "react";

const useScreenSectionNavigator = () => {
  const context = useContext(ScreenSectionContext);
  if (!context) {
    throw new Error(
      "useScreenSectionNavigator must be used within a ScreenSectionProvider"
    );
  }
  return context;
};
export { useScreenSectionNavigator };
