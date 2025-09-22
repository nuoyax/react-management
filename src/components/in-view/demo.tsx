import { InViewBox } from '.';
import './index.css';

export function InViewDemo() {
  return (
    <div className="app">
      <header className="header">
        <h1>useInView Hook Demo (TypeScript)</h1>
        <p>Scroll down to see the magic happen.</p>
      </header>

      <div className="spacer"></div>

      {/* 示例 1: 只触发一次 */}
      <InViewBox triggerOnce={true} threshold={0.5}>
        Box 1 (Triggers Once)
      </InViewBox>

      {/* 示例 2: 每次进入/离开都触发 */}
      <InViewBox triggerOnce={false} threshold={0.1}>
        Box 2 (Triggers Every Time)
      </InViewBox>

      {/* 示例 3: 几乎完全可见时才触发 */}
      <InViewBox triggerOnce={false} threshold={0.9}>
        Box 3 (90% Visible to Trigger)
      </InViewBox>

      <div className="spacer"></div>
    </div>
  );
}
