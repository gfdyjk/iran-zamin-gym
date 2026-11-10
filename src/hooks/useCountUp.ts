import { useEffect, useState } from 'react';
import { toFa } from '../data/site';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Animates a number from 0 to `target` once `active` becomes true.
 * Respects prefers-reduced-motion by jumping straight to the final value.
 */
export function useCountUp(target: number, active: boolean, options: { duration?: number; decimals?: number } = {}) {
  const { duration = 1400, decimals = 0 } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return toFa(value.toFixed(decimals)).replace('.', '٫');
}
