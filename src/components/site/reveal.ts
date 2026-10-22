/**
 * Tiny handshake between the loader and the hero.
 *
 * The loader calls `startReveal()` as its curtain starts to lift; the hero
 * and header wait on `onReveal()` before playing their entrances. With no
 * loader (reduced motion) the reveal happens at once.
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
