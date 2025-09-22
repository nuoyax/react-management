import { useEffect, useState } from 'react';

export function useDelayLoading(isLoading: boolean, delay: number = 800) {
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (isLoading) {
      timer = setTimeout(() => {
        setLoading(true);
      }, delay);
    } else {
      setLoading(false);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoading, delay]);

  return loading;
}
