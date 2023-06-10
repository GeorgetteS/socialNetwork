import { useEffect, useRef } from 'react';

export const useDebounce = (cb, delay) => {
  const timer = useRef(null);

  const clearTimer = () => {
    if (!timer.current) return;

    clearTimeout(timer.current);

    timer.current = null;
  };

  const call = (...args) => {
    clearTimer();
    timer.current = setTimeout(() => cb(...args), delay);
  };

  useEffect(() => {
    return clearTimer();
  }, []);

  return call;
};
