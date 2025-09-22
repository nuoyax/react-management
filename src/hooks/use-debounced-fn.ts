import { useCallback, useEffect, useRef } from 'react';

type DebouncedFn<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

interface UseDebouncedFnOptions {
  immediate?: boolean; // 是否立即执行
}

export function useDebouncedFn<T extends (...args: any[]) => void>(
  fn: T,
  delay: number, // 防抖延迟时间
  { immediate = false }: UseDebouncedFnOptions = {}, // 选项对象，控制是否立即执行
): [DebouncedFn<T>, () => void] {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgs = useRef<Parameters<T> | null>(null); // 保存最后一次传入的参数
  const hasExecutedImmediately = useRef(false); // 标记是否已经执行过立即调用
  const fnRef = useRef(fn); // 将 `fn` 存储到 `useRef` 中，确保始终使用最新的 `fn`

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      lastArgs.current = args; // 每次保存参数

      if (timer.current) {
        clearTimeout(timer.current);
      }

      // 如果立即执行选项为 true 并且还没有执行过立即调用
      if (immediate && !hasExecutedImmediately.current) {
        fnRef.current(...args);
        hasExecutedImmediately.current = true; // 设置立即执行标记
        return;
      }

      // 设置新的定时器
      timer.current = setTimeout(() => {
        fnRef.current(...(lastArgs.current ?? [])); // 延迟后执行原始函数
        hasExecutedImmediately.current = false; // 重置立即执行标记
      }, delay);
    },
    [delay, immediate],
  );

  // 清除定时器
  const cancelDebounce = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    hasExecutedImmediately.current = false; // 重置立即执行标记
  }, []);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return [debouncedFn, cancelDebounce];
}
