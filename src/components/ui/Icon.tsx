import type { SVGProps } from 'react';
import type { IconName } from '../../data/site';

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

/** Single line-icon set — 24px grid, 1.5 stroke, currentColor. */
export function Icon({ name, size = 24, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

const paths: Record<IconName, React.ReactNode> = {
  code: (
    <>
      <polyline points="8 7 3.5 12 8 17" />
      <polyline points="16 7 20.5 12 16 17" />
      <line x1="13.6" y1="4.8" x2="10.4" y2="19.2" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 3.5 7.5 12 12l8.5-4.5L12 3Z" />
      <path d="M3.5 12.4 12 16.9l8.5-4.5" />
      <path d="M3.5 17 12 21.5 20.5 17" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.5l1.9 5.4 5.4 1.9-5.4 1.9L12 18.1l-1.9-5.4L4.7 10.8l5.4-1.9L12 3.5Z" />
      <path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
    </>
  ),
  cap: (
    <>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" />
      <path d="M6.5 11.2v4.9c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.9" />
      <path d="M21.5 9v5.2" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20.2l4.3-1.1 9.6-9.6a2.1 2.1 0 0 0-3-3L5.3 16 4 20.2Z" />
      <path d="M14.6 5.4 18.6 9.4" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2.2" />
      <path d="M9 20h6" />
      <path d="M12 16.5V20" />
    </>
  ),
  wordpress: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.8 9.4 8.6 16.6l2.5-6.1 2.4 6.1 2.9-7.2" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.8 0 2.2-1.1 2.2-2.1 0-1.2-1-1.8-.2-3 .6-.9 1.7-.9 3.1-.9 2 0 3.9-.6 3.9-3.2A8.6 8.6 0 0 0 12 3Z" />
      <circle cx="8.2" cy="9.4" r="1" />
      <circle cx="12" cy="7.4" r="1" />
      <circle cx="15.8" cy="9.4" r="1" />
    </>
  ),
  ai: (
    <>
      <rect x="7.2" y="7.2" width="9.6" height="9.6" rx="2.2" />
      <path d="M10 3.2v4M14 3.2v4M10 16.8v4M14 16.8v4M3.2 10h4M3.2 14h4M16.8 10h4M16.8 14h4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 3.5V20h16" />
      <rect x="7.4" y="12" width="3.2" height="5" rx="1" />
      <rect x="13.2" y="7.6" width="3.2" height="9.4" rx="1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.6" />
      <path d="m15.9 15.9 4.4 4.4" />
    </>
  ),
  brand: (
    <>
      <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
      <circle cx="12" cy="12" r="2.2" />
    </>
  ),
  bolt: <path d="M13.2 2.5 5.6 13.6h5.1l-1 7.9 7.7-11.2h-5.1l.9-7.8Z" />,
  gauge: (
    <>
      <path d="M4 17.5a8.6 8.6 0 1 1 16 0" />
      <path d="M12 13.6 16.4 9" />
      <circle cx="12" cy="17.2" r="1.4" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.4" />
      <path d="m3.6 7.2 8.4 5.9 8.4-5.9" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v11.2" />
      <path d="m7.6 10.2 4.4 4.4 4.4-4.4" />
      <path d="M4 19.6h16" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12.6 4.6 4.6L19 7.4" />,
};
