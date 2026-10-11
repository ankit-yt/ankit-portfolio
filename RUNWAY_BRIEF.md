# Runway motion brief

Status: Runway integration found and suggested. Account connection and generation are pending. No Runway credits have been used by this task.

## Intended clip

A short landscape cinematic background for the portfolio's scroll-scrubbed 3D sequence. Generated footage is decorative motion design, not a claim about client work. Aim for one continuous 5–8 second shot; select an available duration after inspecting connected generation capabilities and credit cost. Check account balance first and stay within the user's available 500 credits. Generate one candidate before considering iterations.

## Prompt

One continuous cinematic camera move through a sculptural liquid-metal installation in a deep obsidian-black studio. A polished fluid chrome ribbon curls and folds slowly, catching saturated electric turquoise rim light and soft warm coral reflections. Floating smoked-glass rectangular planes sit at different depths, like frames suspended inside a film-editing timeline. The camera makes a deliberate smooth forward dolly, with subtle parallax as the planes pass on either side. The liquid ribbon stretches into a graceful open loop, with believable surface tension and crisp reflective highlights. Premium motion-design studio aesthetic, tactile materials, restrained lighting, high contrast, beautiful negative space. Keep the lower-left area visually quiet for website typography. No cuts, no flashes, no sudden acceleration, no people, no letters, no logos, no interface graphics. Maintain consistent lighting and composition throughout so individual frames look beautiful when the viewer pauses or scrolls backward. Landscape 16:9 composition.

## Website integration

- Replace the temporary artwork montage at `public/motion/portfolio-reel.mp4` with the generated, optimized clip, or pass its local URL as the `source` prop to `ScrollReel` in `src/App.jsx`.
- Create a poster from the first frame. Update the video poster and caption in `src/components/ScrollReel.jsx` to describe the generated motion study rather than project artwork.
- Optimize for seeking: H.264 MP4, yuv420p, faststart, frequent keyframes (approximately every 0.5 seconds), 24 FPS, no audio; output size chosen after inspecting source quality.
- Validate forward and backward scroll seeking on desktop and touch emulation. Preserve reduced-motion behavior and offscreen pausing.
- The current temporary montage is derived only from existing project artwork and is explicitly labelled as such.
