import { useEffect, useMemo, useRef } from 'react';

export function useCallbackRef<T extends (...args: any[]) => any>(callback: T) {
  const callbackRef = useRef(callback);

  // callbackRef.current = callback;
  // 为什么不直接写 callbackRef.current = callback;
  // 核心问题：渲染的“纯粹性”与“可中断性”
  // React 的一个核心设计原则是：渲染过程应该是纯粹的。这意味着对于相同的 state 和 props，
  // 组件应该总是返回相同的 JSX。在渲染过程中执行修改（即“副作用”），会破坏这个原则。
  // 为什么这如此重要？因为在未来的 React（以及现在的并发模式中），
  // React 可能会多次调用你的组件函数（即多次渲染），但最终只“提交”一次结果到屏幕上。

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(() => {
    const fn = (...args: Parameters<T>) => callbackRef.current(...args);
    return fn as T;
  }, []);
}
