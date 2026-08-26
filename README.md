# FX Globals — Motion Graphics Studio

Code-driven motion graphics videos for the **FX Globals** app (forex & trading education:
courses, AI mentor, signals & market analysis, points/challenges/rewards).

Everything is built with [Remotion](https://remotion.dev) — the videos are React components,
so every color, word, timing and screen can be edited in code and re-rendered for free.

## Videos

| Composition | Format | Length | Purpose |
|---|---|---|---|
| `tutorial-1-getting-started` | 1920×1080 | ~43s | How to sign up and tour the app |
| `tutorial-2-signals-analysis` | 1920×1080 | ~42s | How to use signals & market analysis |
| `tutorial-3-rewards` | 1920×1080 | ~40s | Points, challenges & rewards system |
| `marketing-social-ad` | 1080×1920 | ~24s | Vertical ad for Reels / TikTok / Shorts |
| `marketing-brand-film` | 1920×1080 | ~48s | Cinematic brand film for web / YouTube |

Rendered MP4s live in `motion-graphics/out/`.

## Render locally

```bash
cd motion-graphics
npm install
npx remotion studio            # live preview & editing in the browser
npx remotion render src/index.ts tutorial-1-getting-started out/tutorial-1.mp4
```

## Project layout

```
motion-graphics/src/
  theme.ts               # brand palette (navy + gold) & font
  components/core.tsx    # backdrop, logo, kinetic typography, springs, disclaimer
  components/phone.tsx   # phone mockup + fake app screens (home, signup, courses, mentor, signals, rewards)
  components/charts.tsx  # animated candlesticks, glowing line chart, confetti
  components/scenes.tsx  # reusable scene templates (intro, phone step, outro)
  videos/                # the five compositions
```

## Editing tips

- Brand colors: `src/theme.ts`
- Wording: each video file in `src/videos/` — all copy is plain strings
- App screens: `src/components/phone.tsx` — swap the fake screens for real
  screenshots by dropping images in `public/` and using Remotion's `<Img>`
- Timing: `durationInFrames` per scene (30 fps)

All videos end with an educational-use disclaimer; keep it for compliance.
