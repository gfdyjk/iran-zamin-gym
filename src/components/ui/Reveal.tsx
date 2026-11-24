import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

type Props = {
  children: ReactNode;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
  variant?: 'up' | 'scale' | 'left' | 'right';
  id?: string;
};

/** Reveals its children once, when they scroll into view. */
export function Reveal({ children, delay = 0, className, as, variant = 'up', id }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = (as ?? 'div') as ElementType;
  const variantClass = variant === 'up' ? '' : `reveal--${variant}`;
  const classes = ['reveal', variantClass, inView ? 'is-visible' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={classes} id={id} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
