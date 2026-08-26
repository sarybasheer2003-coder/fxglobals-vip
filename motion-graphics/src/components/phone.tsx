import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';

// Phone frame; children fill the screen. Scaled via `height`.
export const PhoneMockup: React.FC<{
  height?: number;
  delay?: number;
  tilt?: number;
  children: React.ReactNode;
}> = ({height = 780, delay = 0, tilt = 0, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 18, stiffness: 90}});
  const w = height * 0.482;
  return (
    <div
      style={{
        width: w,
        height,
        borderRadius: height * 0.075,
        background: '#05070D',
        border: `${height * 0.008}px solid #2A3B52`,
        boxShadow: `0 ${height * 0.05}px ${height * 0.12}px rgba(0,0,0,0.6), 0 0 ${height * 0.1}px ${COLORS.gold}22`,
        padding: height * 0.014,
        opacity: Math.min(1, s * 1.5),
        transform: `translateY(${(1 - s) * 120}px) rotate(${tilt}deg) scale(${0.92 + s * 0.08})`,
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: height * 0.062,
          background: COLORS.bg2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {children}
        <div
          style={{
            position: 'absolute',
            top: height * 0.012,
            left: '50%',
            transform: 'translateX(-50%)',
            width: w * 0.3,
            height: height * 0.026,
            borderRadius: 999,
            background: '#05070D',
          }}
        />
      </div>
    </div>
  );
};

const Row: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{display: 'flex', alignItems: 'center', ...style}}>{children}</div>
);

const screenPad = 22;

const ScreenHeader: React.FC<{title: string; sub?: string}> = ({title, sub}) => (
  <div style={{padding: `${screenPad + 30}px ${screenPad}px 12px`}}>
    <div style={{fontSize: 15, color: COLORS.muted, fontWeight: 600}}>{sub ?? 'FX GLOBALS'}</div>
    <div style={{fontSize: 27, color: COLORS.white, fontWeight: 800, marginTop: 2}}>{title}</div>
  </div>
);

const Card: React.FC<{children: React.ReactNode; delay?: number; style?: React.CSSProperties; glow?: boolean}> = ({
  children,
  delay = 0,
  style,
  glow,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 200}});
  return (
    <div
      style={{
        background: COLORS.panel,
        border: `1.5px solid ${glow ? COLORS.gold : COLORS.panelEdge}`,
        boxShadow: glow ? `0 0 24px ${COLORS.gold}33` : undefined,
        borderRadius: 18,
        padding: 16,
        margin: `0 ${screenPad}px 12px`,
        opacity: s,
        transform: `translateY(${(1 - s) * 24}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const IconDot: React.FC<{label: string; color?: string}> = ({label, color = COLORS.gold}) => (
  <div
    style={{
      width: 42,
      height: 42,
      borderRadius: 13,
      background: `${color}22`,
      color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 21,
      fontWeight: 800,
      flexShrink: 0,
    }}
  >
    {label}
  </div>
);

// ---- Screens ----

export const HomeScreen: React.FC<{delay?: number; highlight?: 'courses' | 'signals' | 'mentor' | 'rewards'}> = ({
  delay = 0,
  highlight,
}) => (
  <div>
    <ScreenHeader title="Welcome back, Sary" sub="HOME" />
    <Card delay={delay} glow={highlight === 'courses'}>
      <Row style={{gap: 12}}>
        <IconDot label="▶" />
        <div>
          <div style={{fontSize: 18, fontWeight: 700, color: COLORS.white}}>Courses</div>
          <div style={{fontSize: 13.5, color: COLORS.muted}}>Learn forex from zero, step by step</div>
        </div>
      </Row>
    </Card>
    <Card delay={delay + 5} glow={highlight === 'signals'}>
      <Row style={{gap: 12}}>
        <IconDot label="↗" color={COLORS.green} />
        <div>
          <div style={{fontSize: 18, fontWeight: 700, color: COLORS.white}}>Signals & Analysis</div>
          <div style={{fontSize: 13.5, color: COLORS.muted}}>Daily market breakdowns</div>
        </div>
      </Row>
    </Card>
    <Card delay={delay + 10} glow={highlight === 'mentor'}>
      <Row style={{gap: 12}}>
        <IconDot label="AI" color={COLORS.blue} />
        <div>
          <div style={{fontSize: 18, fontWeight: 700, color: COLORS.white}}>AI Mentor</div>
          <div style={{fontSize: 13.5, color: COLORS.muted}}>Ask anything, anytime</div>
        </div>
      </Row>
    </Card>
    <Card delay={delay + 15} glow={highlight === 'rewards'}>
      <Row style={{gap: 12}}>
        <IconDot label="★" />
        <div>
          <div style={{fontSize: 18, fontWeight: 700, color: COLORS.white}}>Rewards</div>
          <div style={{fontSize: 13.5, color: COLORS.muted}}>1,250 points · 2 challenges live</div>
        </div>
      </Row>
    </Card>
  </div>
);

export const SignupScreen: React.FC<{delay?: number}> = ({delay = 0}) => {
  const frame = useCurrentFrame();
  const typed = Math.max(0, Math.floor((frame - delay - 12) / 2.2));
  const email = 'sary@fxglobals.co'.slice(0, typed);
  const btn = spring({frame: frame - delay - 55, fps: 30, config: {damping: 12}});
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 70, marginBottom: 18}}>
        <svg width={64} height={64} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke={COLORS.gold} strokeWidth="6" />
          <ellipse cx="50" cy="50" rx="20" ry="44" fill="none" stroke={COLORS.gold} strokeWidth="4" />
          <line x1="6" y1="50" x2="94" y2="50" stroke={COLORS.gold} strokeWidth="4" />
        </svg>
      </div>
      <div style={{textAlign: 'center', fontSize: 25, fontWeight: 800, color: COLORS.white, marginBottom: 22}}>
        Create your account
      </div>
      <Card delay={delay}>
        <div style={{fontSize: 13, color: COLORS.muted, marginBottom: 4}}>Email</div>
        <div style={{fontSize: 17, color: COLORS.white, fontWeight: 600, minHeight: 22}}>
          {email}
          <span style={{opacity: frame % 20 < 10 ? 1 : 0, color: COLORS.gold}}>|</span>
        </div>
      </Card>
      <Card delay={delay + 6}>
        <div style={{fontSize: 13, color: COLORS.muted, marginBottom: 4}}>Password</div>
        <div style={{fontSize: 17, color: COLORS.white, fontWeight: 600, letterSpacing: 3}}>
          {'•'.repeat(Math.min(8, Math.max(0, typed - 8)))}
        </div>
      </Card>
      <div
        style={{
          margin: `18px ${screenPad}px 0`,
          background: COLORS.gold,
          color: COLORS.bg,
          textAlign: 'center',
          fontWeight: 800,
          fontSize: 18,
          padding: '15px 0',
          borderRadius: 14,
          transform: `scale(${0.9 + btn * 0.1})`,
          opacity: Math.min(1, btn * 2),
        }}
      >
        Get Started →
      </div>
    </div>
  );
};

export const CoursesScreen: React.FC<{delay?: number}> = ({delay = 0}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [15, 70], [0, 0.64], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lessons = [
    ['What is Forex?', 'done'],
    ['Reading candlesticks', 'done'],
    ['Support & resistance', 'now'],
    ['Risk management basics', 'todo'],
  ] as const;
  return (
    <div>
      <ScreenHeader title="Forex Foundations" sub="COURSES" />
      <Card delay={delay}>
        <Row style={{justifyContent: 'space-between', marginBottom: 8}}>
          <div style={{fontSize: 14.5, color: COLORS.muted, fontWeight: 600}}>Course progress</div>
          <div style={{fontSize: 15, color: COLORS.gold, fontWeight: 800}}>{Math.round(p * 100)}%</div>
        </Row>
        <div style={{height: 10, borderRadius: 999, background: COLORS.panelEdge}}>
          <div
            style={{
              height: '100%',
              width: `${p * 100}%`,
              borderRadius: 999,
              background: `linear-gradient(90deg, ${COLORS.goldDeep}, ${COLORS.gold})`,
            }}
          />
        </div>
      </Card>
      {lessons.map(([t, st], i) => (
        <Card key={t} delay={delay + 8 + i * 5} glow={st === 'now'}>
          <Row style={{gap: 12}}>
            <IconDot
              label={st === 'done' ? '✓' : st === 'now' ? '▶' : `${i + 1}`}
              color={st === 'done' ? COLORS.green : st === 'now' ? COLORS.gold : COLORS.muted}
            />
            <div style={{fontSize: 16.5, fontWeight: 700, color: st === 'todo' ? COLORS.muted : COLORS.white}}>
              {t}
            </div>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export const MentorScreen: React.FC<{delay?: number}> = ({delay = 0}) => {
  const Bubble: React.FC<{me?: boolean; d: number; children: React.ReactNode}> = ({me, d, children}) => {
    const frame = useCurrentFrame();
    const s = spring({frame: frame - delay - d, fps: 30, config: {damping: 15}});
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: me ? 'flex-end' : 'flex-start',
          margin: `0 ${screenPad}px 10px`,
          opacity: Math.min(1, s * 1.6),
          transform: `translateY(${(1 - s) * 16}px)`,
        }}
      >
        <div
          style={{
            maxWidth: '82%',
            background: me ? COLORS.gold : COLORS.panel,
            color: me ? COLORS.bg : COLORS.white,
            border: me ? 'none' : `1.5px solid ${COLORS.panelEdge}`,
            borderRadius: 16,
            padding: '11px 14px',
            fontSize: 14.5,
            fontWeight: me ? 700 : 500,
            lineHeight: 1.4,
          }}
        >
          {children}
        </div>
      </div>
    );
  };
  return (
    <div>
      <ScreenHeader title="AI Mentor" sub="ALWAYS ON" />
      <Bubble me d={5}>
        What does a stop-loss actually do?
      </Bubble>
      <Bubble d={22}>
        A stop-loss automatically closes your position at a price you choose — it caps how much a single trade can
        lose. Think of it as your safety net. 🛡️
      </Bubble>
      <Bubble me d={55}>
        Show me an example on EUR/USD
      </Bubble>
      <Bubble d={72}>Sure — here's a practice scenario with entry, stop and target…</Bubble>
    </div>
  );
};

export const SignalScreen: React.FC<{delay?: number}> = ({delay = 0}) => (
  <div>
    <ScreenHeader title="Today's Signals" sub="LEARN BY EXAMPLE" />
    <Card delay={delay} glow>
      <Row style={{justifyContent: 'space-between', marginBottom: 10}}>
        <div style={{fontSize: 19, fontWeight: 800, color: COLORS.white}}>EUR / USD</div>
        <div
          style={{
            background: `${COLORS.green}22`,
            color: COLORS.green,
            fontWeight: 800,
            fontSize: 14,
            padding: '5px 12px',
            borderRadius: 999,
          }}
        >
          BUY ↗
        </div>
      </Row>
      {[
        ['Entry', '1.0842', COLORS.white],
        ['Stop-loss', '1.0810', COLORS.red],
        ['Take-profit', '1.0905', COLORS.green],
      ].map(([k, v, c]) => (
        <Row key={k} style={{justifyContent: 'space-between', padding: '5px 0'}}>
          <div style={{fontSize: 14.5, color: COLORS.muted, fontWeight: 600}}>{k}</div>
          <div style={{fontSize: 15.5, color: c as string, fontWeight: 800}}>{v}</div>
        </Row>
      ))}
    </Card>
    <Card delay={delay + 8}>
      <Row style={{justifyContent: 'space-between', marginBottom: 10}}>
        <div style={{fontSize: 19, fontWeight: 800, color: COLORS.white}}>GBP / JPY</div>
        <div
          style={{
            background: `${COLORS.red}22`,
            color: COLORS.red,
            fontWeight: 800,
            fontSize: 14,
            padding: '5px 12px',
            borderRadius: 999,
          }}
        >
          SELL ↘
        </div>
      </Row>
      <div style={{fontSize: 13.5, color: COLORS.muted}}>Analysis attached · tap to study the setup</div>
    </Card>
    <Card delay={delay + 16}>
      <div style={{fontSize: 13.5, color: COLORS.muted, lineHeight: 1.45}}>
        ⚠️ Signals are learning tools, not guarantees. Always understand the setup before you act.
      </div>
    </Card>
  </div>
);

export const RewardsScreen: React.FC<{delay?: number}> = ({delay = 0}) => {
  const frame = useCurrentFrame();
  const pts = Math.round(
    interpolate(frame - delay, [10, 60], [980, 1250], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
  );
  return (
    <div>
      <ScreenHeader title="Your Rewards" sub="KEEP LEARNING" />
      <Card delay={delay} glow>
        <div style={{textAlign: 'center', padding: '6px 0'}}>
          <div style={{fontSize: 44, fontWeight: 800, color: COLORS.gold}}>{pts.toLocaleString()}</div>
          <div style={{fontSize: 14, color: COLORS.muted, fontWeight: 600, letterSpacing: '0.1em'}}>POINTS</div>
        </div>
      </Card>
      <Card delay={delay + 8}>
        <Row style={{gap: 12}}>
          <IconDot label="🔥" />
          <div>
            <div style={{fontSize: 16.5, fontWeight: 700, color: COLORS.white}}>7-day learning streak</div>
            <div style={{fontSize: 13.5, color: COLORS.muted}}>+50 pts per day</div>
          </div>
        </Row>
      </Card>
      <Card delay={delay + 14}>
        <Row style={{gap: 12}}>
          <IconDot label="🏆" color={COLORS.green} />
          <div>
            <div style={{fontSize: 16.5, fontWeight: 700, color: COLORS.white}}>Candlestick Challenge</div>
            <div style={{fontSize: 13.5, color: COLORS.muted}}>Rank #12 of 340 · ends in 2 days</div>
          </div>
        </Row>
      </Card>
      <Card delay={delay + 20}>
        <Row style={{gap: 12}}>
          <IconDot label="🎁" />
          <div>
            <div style={{fontSize: 16.5, fontWeight: 700, color: COLORS.white}}>Redeem rewards</div>
            <div style={{fontSize: 13.5, color: COLORS.muted}}>Pro courses · merch · more</div>
          </div>
        </Row>
      </Card>
    </div>
  );
};
