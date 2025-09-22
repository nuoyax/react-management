import { useCallback, useState } from 'react';

export function useBoolean(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setValue, setTrue, setFalse };
}
