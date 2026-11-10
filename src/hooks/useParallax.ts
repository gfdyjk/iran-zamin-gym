import { useEffect, useState } from 'react';

/**
 * Returns a subtle vertical offset (px) based on how far the element has
 * scrolled through the viewport. Disabled for reduced-motion users.
 */
export function useParallax(strength = 80) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const scroll = window.scrollY;
      // Only the first screen matters for the hero parallax.
      const next = Math.min(scroll, window.innerHeight) * (strength / window.innerHeight);
      setOffset(Math.round(next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return offset;
}
