---
name: Sticky scroll trigger alignment
description: The relationship between CSS sticky panel release points and GSAP ScrollTrigger end values.
---

When a section contains a 100vh CSS `position: sticky` panel, a GSAP trigger that starts at `top top` should end at `bottom bottom` if its progress is meant to drive the entire visible sticky interval.

**Why:** Ending at `bottom top` continues advancing after the parent has already released the sticky panel, so the animation progresses while its content has moved out of the viewport and appears to skip or go blank.

**How to apply:** For future sticky scroll narratives, align the trigger end with the panel’s natural release boundary first; only use a longer end distance when the pinned element is explicitly managed by GSAP.