import './Logo.css';

/** Geometric M monogram inside a hex frame — the site's brand mark. */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <span className={`logo-mark ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M20 2.6 35.2 11v18L20 37.4 4.8 29V11L20 2.6Z" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
        <path
          d="M13.4 26.2V14.4l6.6 7.6 6.6-7.6v11.8"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="20" r="1.5" fill="currentColor" />
      </svg>
    </span>
  );
}
