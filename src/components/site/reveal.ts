/**
 * Tiny handshake between the loader and the hero.
 *
 * The loader calls `startReveal()` the moment its curtain starts collapsing
 * into the hero's "O"; the hero waits on `onReveal()` before playing its
 * entrance. If there is no loader (reduced motion), the hero reveals at once.
 */

let revealed = false;
const listeners = new Set<() => void>();

export function startReveal() {
  if (revealed) return;
  revealed = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onReveal(fn: () => void): () => void {
  if (revealed) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** The hero registers the element the loader should collapse into. */
let target: HTMLElement | null = null;
export const setRevealTarget = (el: HTMLElement | null) => { target = el; };
export const getRevealTarget = () => target;
