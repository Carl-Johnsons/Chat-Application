import {
  LegacyRef,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
export interface ScreenSectionContextProps {
  leftRef: React.RefObject<HTMLDivElement>;
  rightRef: React.RefObject<HTMLDivElement>;
  handleClickScreenSection: (leftShow: boolean) => void;
}
const ScreenSectionContext = createContext<
  ScreenSectionContextProps | undefined
>(undefined);

const ScreenSectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const leftRef: LegacyRef<HTMLDivElement> = useRef(null);
  const rightRef: LegacyRef<HTMLDivElement> = useRef(null);
  const restoreDefault = () => {
    if (!leftRef.current || !rightRef.current) {
      return;
    }
    leftRef.current.classList.remove("d-none");
    rightRef.current.classList.remove("d-flex");
    rightRef.current.classList.add("d-none");
    rightRef.current.classList.add("d-md-flex");
  };
  const showLeft = () => {
    if (!leftRef.current) {
      return;
    }
    leftRef.current.classList.remove("d-none");
  };
  const hideLeft = () => {
    if (!leftRef.current) {
      return;
    }
    leftRef.current.classList.add("d-none");
  };
  const showRight = () => {
    if (!rightRef.current) {
      return;
    }
    rightRef.current.classList.remove("d-none");
    rightRef.current.classList.add("d-flex");
  };
  const hideRight = () => {
    if (!rightRef.current) {
      return;
    }

    rightRef.current.classList.add("d-none");
    rightRef.current.classList.remove("d-flex");
  };
  /**
   * - If leftShow is true, it will show left and hide right if width < 768px
   * - Otherwise, show right and hide left if width < 768px
   */
  const handleClickScreenSection = useCallback((leftShow: boolean) => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      return;
    }
    if (leftShow) {
      showLeft();
      hideRight();
    } else {
      showRight();
      hideLeft();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (!leftRef.current || !rightRef.current) {
        return;
      }
      //Restore to default layout if the screen is larger than 768px
      if (window.matchMedia("(min-width: 768px)").matches) {
        restoreDefault();
        return;
      }
    });
  });
  const contextValue: ScreenSectionContextProps = {
    leftRef,
    rightRef,
    handleClickScreenSection,
  };
  return (
    <ScreenSectionContext.Provider value={contextValue}>
      {children}
    </ScreenSectionContext.Provider>
  );
};
export { ScreenSectionProvider, ScreenSectionContext };
