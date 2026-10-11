# Portfolio redesign verification

Verified on 2026-10-11 using the production Vite build in locally installed, headless Google Chrome. Browser checks use temporary Playwright tooling; no runtime dependency was added.

## Checks performed

- Production build: `npm run build` passed.
- `git diff --check` passed.
- Responsive browser checks passed at 320×740, 390×844, 768×1024, 1024×768, 1440×1000, and 844×390.
- Checked horizontal overflow throughout every section, mobile menu opening and navigation, category filters, project counts, video and image viewers, close buttons, Escape dismissal, and testimonial viewer.
- No uncaught page exceptions in the responsive checks.
- Verified that video iframes are absent until a video is opened and removed on close.
- Verified reduced-motion and unavailable-WebGL fallbacks, plus a simulated WebGL context loss.
- Verified that the chrome renderer stops offscreen and renders no continuous frames on touch devices.
- Verified no broken loaded images or failed local asset responses.
- Reviewed mobile and desktop hero screenshots.

## Local measurements

These are unthrottled local browser samples, not Lighthouse scores or real-device/production guarantees. Scripted scrolling can introduce later LCP candidates, so initial-load metrics were recorded before scrolling.

| Profile | Initial LCP | Initial CLS | CLS throughout scripted scrolling | Renderer draw calls during a one-second sample |
| --- | ---: | ---: | ---: | ---: |
| Desktop, 1440×1000 | 2296 ms | 0 | 0 | 60 |
| Touch emulation, 390×844 | 208 ms | 0 | 0 | 0 after initial render |

Draw-call cadence does not measure GPU frame completion or guarantee 60 FPS on other hardware.

The nine original display images totalled 15,530,896 bytes. Their full-size optimized WebP variants total 714,298 bytes, approximately 95% smaller. Smaller 640px gallery variants are also supplied. Originals remain in place. Fonts are locally hosted, preloaded, and distributed with their licenses. The chrome renderer is a separate 5.46 KB JavaScript chunk (2.41 KB gzip).

## Remaining limits

- Physical iOS/Android devices, Safari, Lighthouse, throttled connections, and long-duration heap/leak profiling were not tested.
- Third-party YouTube playback depends on network, browser policies, and embed availability. Existing video URLs were retained.
- The existing Product Launch entry has no image or destination; it remains visible with a preview-unavailable label.
- Smoothness depends on hardware. Sustained slow frame cadence lowers mesh/resolution quality and then selects the SVG fallback. Small screens alone do not determine graphics quality; touch input selects a static render.

Local browser scripts and screenshots are in the ignored `.qa.local/` directory. This was a local checkout update; no deployment was performed.
