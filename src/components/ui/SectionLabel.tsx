import type { ReactNode } from 'react';
import { toFa } from '../../data/site';

type Props = {
  /** Latin index like "01" — rendered with Persian digits. */
  index?: string;
  children: ReactNode;
};

export function SectionLabel({ index, children }: Props) {
  return (
    <p className="eyebrow">
      {index ? <span className="eyebrow__index">{toFa(index)}</span> : null}
      <span>{children}</span>
    </p>
  );
}
