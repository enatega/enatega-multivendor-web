import { useRef } from "react";


//  debouncing function calls
const useDebounceFunction = (callback: (...args: any[]) => void, delay: number) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  return (...args: any[]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default useDebounceFunction;
