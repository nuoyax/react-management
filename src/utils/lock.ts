/**
 * 异步锁, 用于异步函数, 防止并发调用
 */
export function lockAsync<T>(fn: (...args: any[]) => Promise<T>) {
  let locked = false;
  return async function (...args: any[]): Promise<T | undefined> {
    if (locked) return;
    locked = true;
    try {
      return await fn(...args);
    } finally {
      locked = false;
    }
  };
}
