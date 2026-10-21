import ScrollTrigger from 'gsap/ScrollTrigger';

let timer = 0;

/**
 * Re-measure every pinned section, top to bottom.
 *
 * FeaturedWork, WorkGallery and BehindTheFrame each build their pin
 * asynchronously (after fonts/images) and rebuild on resize. A pin created
 * after the ones below it leaves their start/end stale, so the sections
 * overlap. Every build calls this; the debounce makes the final refresh run
 * once, after the last build, with triggers sorted by page position.
 */
export function refreshPins() {
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }, 120);
}
