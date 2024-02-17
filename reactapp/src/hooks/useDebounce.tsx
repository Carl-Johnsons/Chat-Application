import { useEffect, useMemo } from "react";
import useTimeout from "./useTimeout";

const useDebounce = (callback: (...args: unknown[]) => void, delay: number) => {
  const { reset, clear } = useTimeout(callback, delay);
  const debounceCallback = useMemo(() => reset, [reset]);
  useEffect(clear, [clear]);
  return debounceCallback;
};

export default useDebounce;
