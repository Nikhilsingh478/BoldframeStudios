---
name: Sticky scroll trigger alignment
description: The relationship between CSS sticky panel release points and GSAP ScrollTrigger end values.
---

Prefer an explicitly GSAP-pinned, `position: relative` viewport for scroll-driven Journey/gallery sections. If a section instead contains a 100vh CSS `position: sticky` panel, a GSAP trigger that starts at `top top` should end at `bottom bottom` so progress matches the panel’s visible interval.

**Why:** Mixing CSS sticky release timing with a separately managed GSAP timeline can leave progress running after content has left the viewport, causing skipped or blank-looking frames. Explicit GSAP pinning gives the animation one owner and a short, predictable travel distance.

**How to apply:** Use a relative 100vh viewport when GSAP owns pinning. For CSS-sticky narratives, align the trigger end with the panel’s natural release boundary; do not combine both pinning models casually.