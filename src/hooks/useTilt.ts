import { useEffect, useRef } from 'react';

const finePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Pointer-driven 3D tilt written straight to CSS custom properties.
 * No React state, no re-renders — the compositor does the work.
 *
 * Writes: --rx / --ry (deg) and --mx / --my (percent, for the sheen).
 */
export function useTilt<T extends HTMLElement>(maxTilt = 7) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;

    let frame = 0;
    let rx = 0;
    let ry = 0;
    let mx = 50;
    let my = 50;

    const paint = () => {
      frame = 0;
      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      el.style.setProperty('--mx', `${mx.toFixed(1)}%`);
      el.style.setProperty('--my', `${my.toFixed(1)}%`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      ry = (px - 0.5) * 2 * maxTilt;
      rx = (0.5 - py) * 2 * maxTilt;
      mx = px * 100;
      my = py * 100;
      schedule();
    };

    const onLeave = () => {
      rx = 0;
      ry = 0;
      mx = 50;
      my = 50;
      schedule();
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('blur', onLeave, true);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('blur', onLeave, true);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [maxTilt]);

  return ref;
}

/**
 * Ambient pointer tracking for the hero: a follow-light plus a normalised
 * -1..1 vector used by the parallax layers. Attach to a section.
 */
export function usePointerField<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;

    let frame = 0;
    let px = 0;
    let py = 0;
    let mx = 50;
    let my = 40;

    const paint = () => {
      frame = 0;
      el.style.setProperty('--px', px.toFixed(3));
      el.style.setProperty('--py', py.toFixed(3));
      el.style.setProperty('--mx', `${mx.toFixed(1)}%`);
      el.style.setProperty('--my', `${my.toFixed(1)}%`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      mx = ((event.clientX - rect.left) / rect.width) * 100;
      my = ((event.clientY - rect.top) / rect.height) * 100;
      schedule();
    };

    const onLeave = () => {
      px = 0;
      py = 0;
      schedule();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
