import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';

// Deterministic pseudo-random (renders must be reproducible frame-to-frame).
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Animated candlestick chart; candles pop in left-to-right.
export const Candles: React.FC<{
  width: number;
  height: number;
  count?: number;
  delay?: number;
  seed?: number;
}> = ({width, height, count = 26, delay = 0, seed = 7}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cw = width / count;
  let price = 0.5;
  const candles: {o: number; c: number; h: number; l: number}[] = [];
  for (let i = 0; i < count; i++) {
    const drift = (rand(seed + i) - 0.42) * 0.16;
    const o = price;
    const c = Math.min(0.94, Math.max(0.06, price + drift));
    const h = Math.max(o, c) + rand(seed + i + 50) * 0.06;
    const l = Math.min(o, c) - rand(seed + i + 90) * 0.06;
    candles.push({o, c, h, l});
    price = c;
  }
  return (
    <svg width={width} height={height} style={{overflow: 'visible'}}>
      {candles.map((k, i) => {
        const s = spring({frame: frame - delay - i * 2, fps, config: {damping: 14, stiffness: 160}});
        const up = k.c >= k.o;
        const color = up ? COLORS.green : COLORS.red;
        const x = i * cw + cw * 0.5;
        const y = (v: number) => height * (1 - v);
        const top = y(Math.max(k.o, k.c));
        const bh = Math.max(3, Math.abs(y(k.o) - y(k.c)));
        return (
          <g key={i} opacity={Math.min(1, s * 1.5)} transform={`translate(0 ${(1 - s) * 30})`}>
            <line x1={x} x2={x} y1={y(k.h)} y2={y(k.l)} stroke={color} strokeWidth={Math.max(1.5, cw * 0.08)} />
            <rect
              x={x - cw * 0.32}
              y={top}
              width={cw * 0.64}
              height={bh}
              rx={2}
              fill={color}
              opacity={0.92}
            />
          </g>
        );
      })}
    </svg>
  );
};

// Glowing animated line chart drawn with stroke-dash.
export const GlowLine: React.FC<{
  width: number;
  height: number;
  delay?: number;
  seed?: number;
  color?: string;
  progress?: number; // 0..1 override; defaults to time-based
}> = ({width, height, delay = 0, seed = 3, color = COLORS.gold, progress}) => {
  const frame = useCurrentFrame();
  const pts: [number, number][] = [];
  const n = 24;
  let v = 0.55;
  for (let i = 0; i <= n; i++) {
    v = Math.min(0.9, Math.max(0.1, v + (rand(seed + i) - 0.44) * 0.18));
    pts.push([(i / n) * width, height * (1 - v)]);
  }
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const len = width * 1.6;
  const p =
    progress ??
    interpolate(frame - delay, [0, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <svg width={width} height={height} style={{overflow: 'visible'}}>
      <defs>
        <linearGradient id={`fade${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${d} L${width} ${height} L0 ${height} Z`}
        fill={`url(#fade${seed})`}
        opacity={p}
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - p)}
        style={{filter: `drop-shadow(0 0 10px ${color})`}}
      />
      {p > 0.98 && (
        <circle cx={pts[n][0]} cy={pts[n][1]} r={8} fill={color} style={{filter: `drop-shadow(0 0 12px ${color})`}} />
      )}
    </svg>
  );
};

// Gold confetti burst for reward moments.
export const Confetti: React.FC<{delay?: number; count?: number; width: number; height: number}> = ({
  delay = 0,
  count = 60,
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  const t = frame - delay;
  if (t < 0) return null;
  const colors = [COLORS.gold, COLORS.goldSoft, COLORS.white, COLORS.green];
  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      {Array.from({length: count}).map((_, i) => {
        const angle = rand(i) * Math.PI * 2;
        const speed = 6 + rand(i + 40) * 10;
        const x = width / 2 + Math.cos(angle) * speed * t;
        const y = height / 2 + Math.sin(angle) * speed * t * 0.8 + 0.18 * t * t;
        const o = interpolate(t, [0, 10, 55], [0, 1, 0], {extrapolateRight: 'clamp'});
        const sz = 7 + rand(i + 80) * 9;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: sz,
              height: sz * 0.55,
              background: colors[i % colors.length],
              opacity: o,
              transform: `rotate(${t * (10 + rand(i) * 20)}deg)`,
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
};
