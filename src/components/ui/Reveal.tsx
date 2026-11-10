import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

type Props = {
  children: ReactNode;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'span';
};

/** Fades and lifts its children into view once, on scroll. */
export function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = as as 'div';
  const classes = ['reveal', inView ? 'is-visible' : '', className].filter(Boolean).join(' ');

  return (
    <Tag ref={ref} data-reveal className={classes} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
