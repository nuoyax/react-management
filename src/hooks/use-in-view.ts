import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
  /** 是否在第一次进入视口后停止观察，默认为 false */
  triggerOnce?: boolean;
}

interface UseInViewReturn {
  /**
   * 一个 Callback Ref。请将其附加到目标 DOM 元素上。
   * 例如: `<div ref={ref}></div>`
   */
  ref: Dispatch<SetStateAction<Element | null>>;
  /** 元素是否在视口内 */
  inView: boolean;
  /**
   * 完整的 IntersectionObserverEntry 对象，提供更详细的交叉信息。
   * 在首次观察前为 undefined。
   */
  entry?: IntersectionObserverEntry;
}

/**
 * 一个自定义 React Hook，用于检测元素是否进入视口。
 * @param {UseInViewOptions} options - IntersectionObserver 的配置选项。
 * @returns {UseInViewReturn}
 */
export const useInView = (options: UseInViewOptions = {}): UseInViewReturn => {
  const { threshold = 0, root = null, rootMargin = '0px', triggerOnce = false } = options;

  // 存储 ref 对应的 DOM 节点。使用 Element 类型，或者更具体的 HTMLElement。
  const [ref, setRef] = useState<Element | null>(null);
  const [inView, setInView] = useState<boolean>(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const hasTriggered = useRef<boolean>(false);

  useEffect(() => {
    if (!ref) return;

    if (triggerOnce && hasTriggered.current) {
      setInView(true);
      return;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [currentEntry] = entries;
      if (currentEntry) {
        setEntry(currentEntry);
        const isIntersecting = currentEntry.isIntersecting;

        if (isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            hasTriggered.current = true;
            observer.unobserve(ref);
          }
        } else {
          // 仅当不是 triggerOnce 模式时才将 inView 设置回 false
          if (!triggerOnce) {
            setInView(false);
          }
        }
      }
    };

    const observerOptions: IntersectionObserverInit = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, threshold, root, rootMargin, triggerOnce]);

  return { ref: setRef, inView, entry };
};
