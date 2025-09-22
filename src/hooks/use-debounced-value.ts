import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay = 300) {
  const [_value, setValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, value]);

  return _value;
}
