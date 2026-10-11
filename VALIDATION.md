# Portfolio verification

Updated 2026-10-11. Local React/Vite checkout; no deployment performed.

## Latest cursor update

- Removed the hero chrome sculpture from the rendered page; its WebGL module is no longer part of the production output.
- Added a bounded Canvas 2D liquid cursor trail with reused glow textures, a maximum of 42 trail points, and a 1.7-second lifetime. Its animation loop stops when the trail fades; it clears on blur, hidden tabs, and pointer exit.
- Added button and project-frame glow, including a pointer-positioned frame highlight.
- Touch and reduced-motion modes disable the cursor canvas. Native cursor behavior and pointer events remain intact.
- Production build passed. Chrome checks verified a visible trail, complete fade to transparency, link click-through, project hover glow, removed sculpture, and no horizontal overflow in mobile/reduced-motion layouts. No page exceptions were recorded in the desktop check.

## Previous revision (before cursor replacement)

- Replaced decorative Unicode glyphs and emoji with a shared SVG icon component, including navigation, actions, media controls, skills, services, and ratings.
- Updated the palette to obsidian, electric turquoise, coral, and violet.
- Mobile liquid animation now runs at a capped 30 FPS with smaller geometry and resolution. Desktop retains adaptive rendering. Reduced-motion, WebGL-failure, context-loss, and offscreen fallbacks remain.
- Added a sticky 3D scroll scene: scrolling seeks a native video forward and backward while floating frames and chapter text move in depth. A keyboard-accessible timeline range also controls progress.
- Current clip: a nine-second H.264 montage derived from existing project artwork, 870,719 bytes, explicitly labelled as a motion study. This is temporary; it is not a newly generated Runway video or a client footage showreel.
- Runway generation is pending installation and account connection. No Runway credits have been spent. See RUNWAY_BRIEF.md for the prepared creative direction and integration plan.

## Checks performed

- Production build: npm run build passed.
- git diff --check passed.
- Navigation, filtering, project viewers, testimonial viewer, reduced-motion and unavailable-WebGL browser regression checks passed at 320×740, 390×844, 768×1024, 1024×768, 1440×1000, and 844×390.
- New scroll-scene checks passed at 320×740, 390×844, 768×1024, 1440×1000, and 844×390.
- Observed approximately 30–32 liquid draw calls per second on touch emulation and 60 on desktop during a one-second sample. This measures draw cadence, not GPU completion or a real-device FPS guarantee.
- Confirmed forward video seeking from approximately 1.3 to 5.8 seconds, and backward seeking to approximately 2.7 seconds.
- Confirmed no horizontal page overflow in the checked layouts and no uncaught page exceptions.
- Confirmed the hero renderer pauses when the scroll scene is in view, skills render SVG icons, and reduced motion prevents the scroll video from downloading.
- Reviewed mobile and desktop scroll-scene screenshots.

## Limits

Physical iOS/Android devices, Safari, Lighthouse, throttled connections, and long-duration memory profiling have not been tested. Prior initial-load LCP/CLS samples belong to the earlier design and should not be treated as measurements of this revision. The actual Runway clip remains pending account connection and generation.

Browser scripts and screenshots are stored in the ignored .qa.local directory. Display-image optimizations, locally hosted fonts, and original portfolio video URLs are preserved.

## Reference hero revision

- Added an overlapping portrait, oversized PORT/FOLIO typography, editor selection details, and a subtle grid inspired by the supplied layout.
- Applied the second reference's near-black, pink, blue, and green palette to accents and the cursor trail.
- Optimized the transparent portrait to a 64 KB WebP and hosted the condensed display font locally.
- Browser checks passed at 320, 390, 768, 844, and 1440 px: portrait decoding, title fit, no horizontal overflow, work link navigation, and no uncaught page exceptions. Reviewed desktop and phone screenshots.
- Production build passed. Checks use desktop Chrome emulation; physical phones were not tested.
