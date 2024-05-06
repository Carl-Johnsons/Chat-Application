import { useEffect, useMemo } from "react";
import { useTimeout } from ".";

const useDebounce = (callback: (...args: unknown[]) => void, delay: number) => {
  const { reset, clear } = useTimeout(callback, delay);
  const debounceCallback = useMemo(() => reset, [reset]);
  useEffect(clear, [clear]);
  return debounceCallback;
};

export { useDebounce };
