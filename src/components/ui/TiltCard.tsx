import type { ReactNode } from 'react';
import { useTilt } from '../../hooks/useTilt';

type Props = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
};

/** Glass card with pointer-driven perspective tilt and a following sheen. */
export function TiltCard({ children, className = '', max = 6 }: Props) {
  const ref = useTilt<HTMLElement>(max);

  return (
    <article ref={ref} className={`card tilt ${className}`.trim()}>
      {children}
    </article>
  );
}
