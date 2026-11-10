import { useEffect, useRef, useState } from 'react';

type Options = {
  /** Fraction of the element that must be visible. */
  threshold?: number;
  rootMargin?: string;
  /** When false the element leaves the "in view" state again after scrolling past. */
  once?: boolean;
};

/**
 * Small IntersectionObserver helper used by reveal animations and counters.
 */
export function useInView<T extends HTMLElement>(options: Options = {}) {
  const { threshold = 0.18, rootMargin = '0px 0px -8% 0px', once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
