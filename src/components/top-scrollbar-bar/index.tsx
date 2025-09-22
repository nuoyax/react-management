import { useTheme } from '@mui/material';
import { motion, useScroll } from 'motion/react';

export function TopScrollBarAnimation() {
  const { scrollYProgress } = useScroll();
  const theme = useTheme();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 5,
        background: theme.palette.secondary.main,
        transformOrigin: '0%',
        zIndex: theme.zIndex.drawer + 1,
      }}
    />
  );
}
