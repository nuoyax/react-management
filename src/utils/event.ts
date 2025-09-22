/**
 * 添加事件监听，支持 HTMLElement 和 Window
 * @param target 要绑定事件的元素或 window
 * @param event 事件类型
 * @param handler 事件处理函数
 * @param options 事件监听选项，默认为 false（冒泡阶段）
 * @returns 返回移除事件监听的函数
 * @example
 * ```ts
 * const removeClick = on(window, 'click', () => {
 *   console.log('click');
 * });
 * removeClick();
 * ```
 */
export function on<
  T extends HTMLElement | Window,
  K extends keyof (T extends Window ? WindowEventMap : HTMLElementEventMap),
>(
  target: T,
  event: K,
  handler: (this: T, ev: (T extends Window ? WindowEventMap : HTMLElementEventMap)[K]) => void,
  options: boolean | AddEventListenerOptions = false,
): () => void {
  target.addEventListener(event as string, handler as EventListener, options);
  return () => {
    target.removeEventListener(event as string, handler as EventListener, options);
  };
}
