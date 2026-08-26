import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {COLORS, FONT} from '../theme';

// Full-frame branded backdrop: gradient, grid, glow orbs, vignette.
export const Backdrop: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 40;
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bg, fontFamily: FONT, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1200px 800px at 70% 20%, ${COLORS.bg2} 0%, ${COLORS.bg} 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${COLORS.panelEdge}22 1px, transparent 1px), linear-gradient(90deg, ${COLORS.panelEdge}22 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.gold}14 0%, transparent 70%)`,
          top: -300,
          right: -200 + drift,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.blue}10 0%, transparent 70%)`,
          bottom: -250,
          left: -150 - drift,
        }}
      />
      {children}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

// Spring fade+rise entrance wrapper.
export const Rise: React.FC<{
  delay?: number;
  from?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({delay = 0, from = 40, children, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 200}});
  return (
    <div style={{opacity: s, transform: `translateY(${(1 - s) * from}px)`, ...style}}>
      {children}
    </div>
  );
};

// Pop-in scale entrance.
export const Pop: React.FC<{
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({delay = 0, children, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 12, stiffness: 120}});
  return <div style={{opacity: Math.min(1, s * 2), transform: `scale(${s})`, ...style}}>{children}</div>;
};

// Fade the whole scene out over its last `duration` frames.
export const SceneFade: React.FC<{duration: number; children: React.ReactNode; fadeFrames?: number}> = ({
  duration,
  children,
  fadeFrames = 10,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 8, duration - fadeFrames, duration],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );
  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

// FX Globals wordmark with globe ring.
export const Logo: React.FC<{size?: number}> = ({size = 96}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: size * 0.28}}>
      <div style={{position: 'relative', width: size, height: size}}>
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke={COLORS.gold} strokeWidth="5" />
          <ellipse cx="50" cy="50" rx="20" ry="44" fill="none" stroke={COLORS.gold} strokeWidth="3.5" opacity="0.8" />
          <line x1="6" y1="50" x2="94" y2="50" stroke={COLORS.gold} strokeWidth="3.5" opacity="0.8" />
          <path d="M14 32 Q50 44 86 32" fill="none" stroke={COLORS.gold} strokeWidth="3" opacity="0.6" />
          <path d="M14 68 Q50 56 86 68" fill="none" stroke={COLORS.gold} strokeWidth="3" opacity="0.6" />
          <circle
            cx={50 + 44 * Math.cos(frame / 20)}
            cy={50 + 44 * Math.sin(frame / 20)}
            r="5"
            fill={COLORS.goldSoft}
          />
        </svg>
      </div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: size * 0.08}}>
        <span style={{fontSize: size * 0.62, fontWeight: 800, color: COLORS.gold, letterSpacing: '-0.02em'}}>
          FX
        </span>
        <span style={{fontSize: size * 0.62, fontWeight: 700, color: COLORS.white, letterSpacing: '0.01em'}}>
          GLOBALS
        </span>
      </div>
    </div>
  );
};

// Word-by-word kinetic headline.
export const Kinetic: React.FC<{
  text: string;
  size?: number;
  delay?: number;
  perWord?: number;
  color?: string;
  highlight?: string[];
  weight?: number;
  align?: 'center' | 'left';
}> = ({text, size = 72, delay = 0, perWord = 4, color = COLORS.white, highlight = [], weight = 800, align = 'center'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: size * 0.28,
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        maxWidth: '100%',
      }}
    >
      {words.map((w, i) => {
        const s = spring({frame: frame - delay - i * perWord, fps, config: {damping: 16, stiffness: 140}});
        const hl = highlight.some((h) => w.replace(/[^A-Za-z0-9]/g, '').toLowerCase() === h.toLowerCase());
        return (
          <span
            key={i}
            style={{
              fontSize: size,
              fontWeight: weight,
              color: hl ? COLORS.gold : color,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              opacity: Math.min(1, s * 1.6),
              transform: `translateY(${(1 - s) * 42}px)`,
              display: 'inline-block',
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

// Step chip + title lower area (for tutorials).
export const StepLabel: React.FC<{step: string; title: string; delay?: number; bottom?: number}> = ({
  step,
  title,
  delay = 0,
  bottom = 70,
}) => (
  <div style={{position: 'absolute', bottom, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
    <Rise delay={delay}>
      <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
        <div
          style={{
            background: COLORS.gold,
            color: COLORS.bg,
            fontWeight: 800,
            fontSize: 26,
            padding: '10px 22px',
            borderRadius: 999,
            letterSpacing: '0.08em',
          }}
        >
          {step}
        </div>
        <div style={{fontSize: 40, fontWeight: 700, color: COLORS.white}}>{title}</div>
      </div>
    </Rise>
  </div>
);

// Small legal line.
export const Disclaimer: React.FC<{bottom?: number; size?: number}> = ({bottom = 24, size = 19}) => (
  <div
    style={{
      position: 'absolute',
      bottom,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: size,
      color: COLORS.muted,
      opacity: 0.85,
      padding: '0 60px',
    }}
  >
    Educational content only — not financial or investment advice. Trading involves risk and may result in loss of capital.
  </div>
);
