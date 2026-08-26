import React from 'react';
import {AbsoluteFill, Series, interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';
import {Backdrop, Kinetic, Logo, Pop, Rise, SceneFade, Disclaimer} from '../components/core';
import {Candles, GlowLine} from '../components/charts';
import {HomeScreen, MentorScreen, RewardsScreen, SignalScreen} from '../components/phone';
import {PhoneMockup} from '../components/phone';

const S = Series.Sequence;

// Rotating wireframe globe (the "Globals" in FX Globals).
const Globe: React.FC<{size: number}> = ({size}) => {
  const frame = useCurrentFrame();
  const spin = frame * 1.2;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{overflow: 'visible'}}>
      <circle cx="100" cy="100" r="90" fill="none" stroke={COLORS.gold} strokeWidth="2" opacity="0.9" />
      {[-60, -30, 0, 30, 60].map((lat) => (
        <ellipse
          key={lat}
          cx="100"
          cy={100 + lat}
          rx={90 * Math.cos((lat / 90) * (Math.PI / 2)) || 1}
          ry={90 * Math.cos((lat / 90) * (Math.PI / 2)) * 0.16}
          fill="none"
          stroke={COLORS.gold}
          strokeWidth="1.2"
          opacity="0.45"
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const rx = Math.abs(90 * Math.cos(((spin + i * 30) * Math.PI) / 180));
        return (
          <ellipse
            key={i}
            cx="100"
            cy="100"
            rx={Math.max(1, rx)}
            ry="90"
            fill="none"
            stroke={COLORS.gold}
            strokeWidth="1.2"
            opacity="0.5"
          />
        );
      })}
      <circle cx="100" cy="100" r="90" fill={`${COLORS.gold}0A`} />
    </svg>
  );
};

const OpeningScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, duration], [1.08, 1]);
  return (
    <SceneFade duration={duration}>
      <Backdrop>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', transform: `scale(${zoom})`}}>
          <div style={{position: 'absolute', opacity: 0.5}}>
            <Globe size={950} />
          </div>
          <div style={{position: 'absolute', bottom: 120, left: 0, right: 0, opacity: 0.5, display: 'flex', justifyContent: 'center'}}>
            <Candles width={1500} height={280} delay={10} count={34} seed={21} />
          </div>
          <div style={{maxWidth: 1350, padding: '0 60px', zIndex: 2}}>
            <Kinetic
              text="The markets move every second. Most people never learn their language."
              size={78}
              delay={8}
              perWord={5}
              highlight={['language']}
            />
          </div>
        </AbsoluteFill>
      </Backdrop>
    </SceneFade>
  );
};

const TurnScene: React.FC<{duration: number}> = ({duration}) => (
  <SceneFade duration={duration}>
    <Backdrop>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 56}}>
        <Pop>
          <Logo size={100} />
        </Pop>
        <div style={{maxWidth: 1300, padding: '0 60px'}}>
          <Kinetic
            text="FX Globals turns learning the markets into a guided journey"
            size={80}
            delay={14}
            highlight={['FX', 'Globals', 'journey']}
          />
        </div>
        <Rise delay={40}>
          <GlowLine width={800} height={140} delay={44} seed={9} />
        </Rise>
      </AbsoluteFill>
    </Backdrop>
  </SceneFade>
);

const PillarScene: React.FC<{
  duration: number;
  index: string;
  title: string;
  desc: string;
  screen: React.ReactNode;
  right?: boolean;
}> = ({duration, index, title, desc, screen, right = true}) => (
  <SceneFade duration={duration}>
    <Backdrop>
      <AbsoluteFill
        style={{
          flexDirection: right ? 'row' : 'row-reverse',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 130,
          padding: '0 140px',
        }}
      >
        <div style={{maxWidth: 780}}>
          <Rise>
            <div style={{fontSize: 150, fontWeight: 800, color: `${COLORS.gold}33`, lineHeight: 1}}>{index}</div>
          </Rise>
          <Kinetic text={title} size={74} delay={8} align="left" highlight={title.split(' ').slice(-1)} />
          <Rise delay={22}>
            <div style={{fontSize: 34, color: COLORS.muted, marginTop: 28, lineHeight: 1.45}}>{desc}</div>
          </Rise>
        </div>
        <PhoneMockup height={820} delay={12} tilt={right ? 4 : -4}>
          {screen}
        </PhoneMockup>
      </AbsoluteFill>
    </Backdrop>
  </SceneFade>
);

const FinaleScene: React.FC<{duration: number}> = ({duration}) => (
  <SceneFade duration={duration}>
    <Backdrop>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 50}}>
        <Pop>
          <Logo size={140} />
        </Pop>
        <Rise delay={12}>
          <div style={{fontSize: 52, fontWeight: 700, color: COLORS.white, textAlign: 'center'}}>
            Master the markets, step by step.
          </div>
        </Rise>
        <Rise delay={24}>
          <div
            style={{
              background: COLORS.gold,
              color: COLORS.bg,
              fontWeight: 800,
              fontSize: 32,
              padding: '20px 52px',
              borderRadius: 999,
              boxShadow: `0 0 60px ${COLORS.gold}44`,
            }}
          >
            Download on the App Store & Google Play
          </div>
        </Rise>
      </AbsoluteFill>
      <Disclaimer />
    </Backdrop>
  </SceneFade>
);

export const MarketingBrandFilm: React.FC = () => (
  <Series>
    <S durationInFrames={220}>
      <OpeningScene duration={220} />
    </S>
    <S durationInFrames={190}>
      <TurnScene duration={190} />
    </S>
    <S durationInFrames={210}>
      <PillarScene
        duration={210}
        index="01"
        title="Structured courses"
        desc="From your first candlestick to full trade analysis — one clear path."
        screen={<HomeScreen delay={14} highlight="courses" />}
      />
    </S>
    <S durationInFrames={210}>
      <PillarScene
        duration={210}
        index="02"
        title="A mentor that never sleeps"
        desc="Ask anything, any hour. Plain-language answers, instantly."
        screen={<MentorScreen delay={14} />}
        right={false}
      />
    </S>
    <S durationInFrames={210}>
      <PillarScene
        duration={210}
        index="03"
        title="Signals & daily analysis"
        desc="Study real setups with entry, stop and target — and learn the why."
        screen={<SignalScreen delay={14} />}
      />
    </S>
    <S durationInFrames={210}>
      <PillarScene
        duration={210}
        index="04"
        title="Rewards for learning"
        desc="Points, streaks and challenges that make progress addictive."
        screen={<RewardsScreen delay={14} />}
        right={false}
      />
    </S>
    <S durationInFrames={190}>
      <FinaleScene duration={190} />
    </S>
  </Series>
);

export const MARKETING_BRAND_DURATION = 220 + 190 + 210 + 210 + 210 + 210 + 190;
