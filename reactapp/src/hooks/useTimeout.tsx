import { useCallback, useEffect, useRef } from "react";

const useTimeout = (callback: (...args: unknown[]) => void, delay: number) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
    }, delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [clear, set]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { set, clear, reset };
};

export default useTimeout;
