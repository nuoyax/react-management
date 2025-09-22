import React from 'react';
import { useInView } from '~/hooks';
import './index.css';

// 为组件的 props 定义类型
interface AnimatedBoxProps {
  children: React.ReactNode;
  triggerOnce?: boolean;
  threshold?: number;
}

export const InViewBox: React.FC<AnimatedBoxProps> = ({ children, triggerOnce = false, threshold = 0.5 }) => {
  const { ref, inView } = useInView({
    threshold: threshold,
    triggerOnce: triggerOnce,
  });

  return (
    <div ref={ref} className={`box ${inView ? 'is-in-view' : ''}`}>
      <h2>{children}</h2>
      <p>
        {`Threshold: ${threshold}`}
        <br />
        {`Trigger Once: ${triggerOnce.toString()}`}
        <br />
        {`In View: ${inView.toString()}`}
      </p>
    </div>
  );
};
