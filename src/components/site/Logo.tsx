/**
 * The BoldFrame mark: a navy "B" inside a blue frame. Same mark everywhere
 * (header, footer, contact dialog, favicons in public/); on a coloured
 * background pass `fill` so the frame sits on white and keeps its colours.
 */
export function LogoMark({ size = 30, fill = 'none' }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" fill={fill} stroke="#0B5CFF" strokeWidth="1.8" />
      <path
        d="M10 8 L10 24 M10 8 L17 8 C19 8 19 12 17 12 L10 12 M10 12 L18 12 C20 12 20 16 20 17.5 C20 20 18 24 16 24 L10 24"
        stroke="#0A1633"
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
