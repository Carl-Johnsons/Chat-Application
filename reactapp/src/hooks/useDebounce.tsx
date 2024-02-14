import { useEffect } from "react";
import useTimeout from "./useTimeout";

const useDebounce = (
  callback: (...args: unknown[]) => void,
  delay: number,
  dependencies: unknown[]
) => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, [clear]);
};

export default useDebounce;
