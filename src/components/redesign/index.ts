/**
 * BoldFrame Redesign — Component Barrel
 *
 * Post-hero sections are exported from here.
 * Chunks 2–4 will add components to this directory.
 *
 * Architecture:
 *   Capabilities/   → customized MagicBento grid (chunk 2)
 *   Journey/        → scroll-drawn BoldFrame Journey (chunk 3)
 *   Manifesto/      → horizontal manifesto strip (chunk 4)
 *
 * All components expect to be rendered inside <div className="boldframe-redesign">
 * and should use --bf-* CSS custom properties for styling.
 */

export { Capabilities } from './Capabilities';
// Chunks 3–4 will add: Journey, Manifesto
