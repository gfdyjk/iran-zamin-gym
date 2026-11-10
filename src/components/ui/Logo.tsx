import './Logo.css';

type Props = {
  /** Persian brand name from site data. */
  persian: string;
  latin: string;
  compact?: boolean;
};

/**
 * Iran Zamin mark: a shield holding a mountain peak over a barbell —
 * "land" plus "strength" in one minimal geometric symbol.
 */
export function Logo({ persian, latin, compact = false }: Props) {
  return (
    <span className={`logo${compact ? ' logo--compact' : ''}`}>
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 44 44" width="44" height="44" fill="none">
          <path
            d="M22 3.5 38.2 12v18.5L22 40.5 5.8 30.5V12L22 3.5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
            opacity="0.55"
          />
          <path d="M12.5 26.5 22 14l9.5 12.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.5 31.5h15" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
          <circle cx="14.5" cy="31.5" r="1.6" fill="currentColor" />
          <circle cx="29.5" cy="31.5" r="1.6" fill="currentColor" />
        </svg>
      </span>
      <span className="logo__type">
        <span className="logo__fa">{persian}</span>
        <span className="logo__lat">{latin}</span>
      </span>
    </span>
  );
}
