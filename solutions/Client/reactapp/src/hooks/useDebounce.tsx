import { useCallback, useEffect, useMemo, useState } from "react";
import { useTimeout } from ".";

const useDebounce = (callback: (...args: unknown[]) => void, delay: number) => {
  const { reset, clear } = useTimeout(callback, delay);
  const debounceCallback = useMemo(() => reset, [reset]);
  useEffect(clear, [clear]);
  return debounceCallback;
};

const useDebounceValue = (
  initialValue: unknown,
  delay: number
): [unknown, (newValue: unknown) => void] => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  const setDebounced = useCallback((newValue: unknown) => {
    setValue(newValue);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, setDebounced];
};

export { useDebounce, useDebounceValue };
