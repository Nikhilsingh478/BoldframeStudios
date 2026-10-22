/**
 * The main call-to-action button.
 *
 * Hover (fine pointers): a white fill grows out of the point where the
 * cursor entered and shrinks back toward where it left, the label rolls to
 * a copy of itself, the arrow slides out and a fresh one slides in, and the
 * whole button leans a few pixels toward the cursor.
 */

import { useRef, type ReactNode } from 'react';

interface ConnectButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: boolean;
  className?: string;
  children?: ReactNode;
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ConnectButton({ label, onClick, type = 'button', disabled, icon = true, className = '' }: ConnectButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const setOrigin = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--fx', `${e.clientX - r.left}px`);
    el.style.setProperty('--fy', `${e.clientY - r.top}px`);
  };

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
    el.style.setProperty('--mx', `${dx.toFixed(1)}px`);
    el.style.setProperty('--my', `${dy.toFixed(1)}px`);
  };

  const onLeave = (e: React.PointerEvent) => {
    setOrigin(e);
    ref.current?.style.setProperty('--mx', '0px');
    ref.current?.style.setProperty('--my', '0px');
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={`bfx-cta${icon ? ' has-icon' : ''} ${className}`}
      onClick={onClick}
      onPointerEnter={setOrigin}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="bfx-cta-fill" aria-hidden="true" />
      <span className="bfx-cta-label">
        <span className="bfx-cta-text" data-text={label}>{label}</span>
      </span>
      {icon && (
        <span className="bfx-cta-icon" aria-hidden="true">
          <span className="bfx-cta-arrows"><Arrow /><Arrow /></span>
        </span>
      )}
    </button>
  );
}
