type IconProps = { size?: number; className?: string };

const stroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Svg({ size = 18, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...stroke}
    >
      {children}
    </svg>
  );
}

export const IconArrowLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19 12H5" />
    <path d="m11 18-6-6 6-6" />
  </Svg>
);

export const IconArrowUp = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 19V5" />
    <path d="m6 11 6-6 6 6" />
  </Svg>
);

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Svg>
);

export const IconPlay = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
    <path d="M8 5.2v13.6a1 1 0 0 0 1.53.85l10.4-6.8a1 1 0 0 0 0-1.7L9.53 4.35A1 1 0 0 0 8 5.2Z" fill="currentColor" />
  </svg>
);

export const IconPause = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
    <rect x="6.5" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
    <rect x="13.5" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Svg>
);

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.6 3.5h2.2l1.6 4-2 1.4a11.5 11.5 0 0 0 5.2 5.2l1.4-2 4 1.6v2.2a2.6 2.6 0 0 1-2.9 2.6A16.5 16.5 0 0 1 4 6.4 2.6 2.6 0 0 1 6.6 3.5Z" />
  </Svg>
);

export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="m4 7 8 5.5L20 7" />
  </Svg>
);

export const IconPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s6.5-5.6 6.5-10.3A6.5 6.5 0 0 0 5.5 10.7C5.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.4" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </Svg>
);

export const IconLock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.6" />
    <path d="M8.6 10.5V8.2a3.4 3.4 0 0 1 6.8 0v2.3" />
  </Svg>
);

export const IconStar = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
    <path
      d="m12 3.6 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8Z"
      fill="currentColor"
    />
  </svg>
);

/* ---------- Program icons ---------- */

export const IconDumbbell = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 9v6M7 7.5v9M17 7.5v9M20 9v6M7 12h10" />
  </Svg>
);

export const IconFlame = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3s5 4.2 5 8.6a5 5 0 0 1-10 0C7 9.4 9 7.6 9 7.6s.4 2 1.6 2.6C11.4 8.4 12 5.6 12 3Z" />
  </Svg>
);

export const IconBarbell = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12" />
    <path d="M9 8.5v7M15 8.5v7" />
  </Svg>
);

export const IconEndurance = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 12.5h3.2l2-4.6 3.2 8.5 2.4-5.4 1.5 2.4H21" />
  </Svg>
);

export const IconSpark = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3v5M12 16v5M4.5 12h5M14.5 12h5M6.7 6.7l3 3M14.3 14.3l3 3M17.3 6.7l-3 3M9.7 14.3l-3 3" />
  </Svg>
);

/* ---------- Social icons ---------- */

export const IconInstagram = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...stroke}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconTelegram = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...stroke}>
    <path d="m20.5 4.2-2.7 15.1c-.2 1-.8 1.2-1.6.8l-4.4-3.3-2.1 2c-.2.2-.4.4-.9.4l.3-4.4 8-7.2c.3-.3 0-.5-.5-.2L7.2 13l-4.2-1.3c-.9-.3-.9-.9.2-1.3L19.3 3c.8-.3 1.4.2 1.2 1.2Z" />
  </svg>
);

export const IconWhatsapp = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...stroke}>
    <path d="M20.4 11.7a8.4 8.4 0 0 1-12.5 7.4L3.6 20.4l1.3-4.2a8.4 8.4 0 1 1 15.5-4.5Z" />
    <path d="M8.9 8.4c.3-.4.6-.3.8.1l.7 1.6c.1.2 0 .4-.2.6l-.5.5c-.2.2-.2.3 0 .6.5.8 1.3 1.6 2.2 2 .3.2.4.1.6-.1l.5-.6c.2-.2.4-.3.6-.2l1.6.8c.4.2.4.5.2.8-.5.8-1.5 1.3-2.4 1.1-2.1-.3-4.4-2.5-4.9-4.6-.2-.9.1-1.9.8-2.6Z" />
  </svg>
);
