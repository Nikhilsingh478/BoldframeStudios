/** The BoldFrame mark: a "B" drawn inside a frame (the original logo). */
export function LogoMark({ size = 30, frame = '#0B5CFF', letter = '#0A1633' }: { size?: number; frame?: string; letter?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" stroke={frame} strokeWidth="1.8" />
      <path
        d="M10 8 L10 24 M10 8 L17 8 C19 8 19 12 17 12 L10 12 M10 12 L18 12 C20 12 20 16 20 17.5 C20 20 18 24 16 24 L10 24"
        stroke={letter}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#hero" className="bf-logo" aria-label="BoldFrame Studios, back to top" onClick={onClick}>
      <LogoMark />
      <span>BoldFrame</span>
    </a>
  );
}
