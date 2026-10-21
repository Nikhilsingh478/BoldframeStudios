import { hostOf } from '../site';

interface BrowserFrameProps {
  src: string;
  alt: string;
  url: string;
  eager?: boolean;
  className?: string;
}

// A screenshot shown at its native 16:9 ratio inside a minimal browser window.
export function BrowserFrame({ src, alt, url, eager, className = '' }: BrowserFrameProps) {
  return (
    <div className={`browser ${className}`}>
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dots"><i /><i /><i /></span>
        <span className="browser-url">{hostOf(url)}</span>
      </div>
      <img
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}
