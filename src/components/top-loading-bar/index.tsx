import { useEffect, useImperativeHandle, useRef, useState } from 'react';

export interface TopLoadingBarRef {
  start: () => void;
  complete: () => void;
}

export function TopLoadingBar({ ref }: { ref: React.Ref<TopLoadingBarRef> }) {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  /* 供父组件通过 ref 调用的方法 */
  useImperativeHandle(ref, () => ({
    start() {
      if (timerRef.current) return;
      setProgress(0);

      let p = 10 + Math.random() * 10;
      setProgress(p);

      const tick = () => {
        const remain = 90 - p;
        if (remain <= 0.1) {
          setProgress(90);
          return;
        }
        p += remain * 0.065;
        setProgress(p);
        timerRef.current = requestAnimationFrame(tick);
      };
      timerRef.current = requestAnimationFrame(tick);
    },

    complete() {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
      setProgress(100);
      setTimeout(() => setProgress(0), 300);
    },
  }));

  /* 卸载时清理定时器 */
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 3,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: '#f11946',
          transition: 'width 250ms ease, opacity 300ms ease',
          opacity: progress > 0 ? 1 : 0,
        }}
      />
    </div>
  );
}
