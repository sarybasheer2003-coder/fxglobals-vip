import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {COLORS} from '../theme';
import {Backdrop, Disclaimer, Kinetic, Logo, Pop, Rise, SceneFade} from '../components/core';
import {Candles} from '../components/charts';
import {HomeScreen, SignalScreen} from '../components/phone';
import {PhoneMockup} from '../components/phone';

const S = Series.Sequence;

// 9:16 vertical, fast-paced. 1080x1920.

const HookScene: React.FC<{duration: number}> = ({duration}) => (
  <SceneFade duration={duration} fadeFrames={6}>
    <Backdrop>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 70px', gap: 60}}>
        <Kinetic
          text="Want to learn forex but don't know where to start?"
          size={92}
          delay={2}
          perWord={3}
          highlight={['forex', 'start']}
        />
        <Rise delay={26}>
          <div style={{opacity: 0.9}}>
            <Candles width={900} height={330} delay={28} count={20} seed={11} />
          </div>
        </Rise>
      </AbsoluteFill>
    </Backdrop>
  </SceneFade>
);

const ValueScene: React.FC<{duration: number; text: string; hl: string[]; screen: React.ReactNode}> = ({
  duration,
  text,
  hl,
  screen,
}) => (
  <SceneFade duration={duration} fadeFrames={6}>
    <Backdrop>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 150, gap: 70}}>
        <div style={{padding: '0 80px'}}>
          <Kinetic text={text} size={80} delay={2} perWord={3} highlight={hl} />
        </div>
        <PhoneMockup height={1050} delay={8}>
          {screen}
        </PhoneMockup>
      </AbsoluteFill>
    </Backdrop>
  </SceneFade>
);

const RapidScene: React.FC<{duration: number}> = ({duration}) => {
  const items = [
    ['📚', 'Courses from zero'],
    ['🤖', 'AI mentor, 24/7'],
    ['📈', 'Daily signals & analysis'],
    ['🏆', 'Earn points & rewards'],
  ] as const;
  return (
    <SceneFade duration={duration} fadeFrames={6}>
      <Backdrop>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 44, padding: '0 90px'}}>
          {items.map(([icon, t], i) => (
            <Pop key={t} delay={4 + i * 9}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 34,
                  background: COLORS.panel,
                  border: `2px solid ${COLORS.panelEdge}`,
                  borderRadius: 30,
                  padding: '34px 50px',
                  width: 850,
                }}
              >
                <div style={{fontSize: 74}}>{icon}</div>
                <div style={{fontSize: 54, fontWeight: 800, color: COLORS.white}}>{t}</div>
              </div>
            </Pop>
          ))}
        </AbsoluteFill>
      </Backdrop>
    </SceneFade>
  );
};

const CtaScene: React.FC<{duration: number}> = ({duration}) => (
  <SceneFade duration={duration} fadeFrames={8}>
    <Backdrop>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 70}}>
        <Pop>
          <Logo size={130} />
        </Pop>
        <Rise delay={10}>
          <div style={{fontSize: 62, fontWeight: 700, color: COLORS.white, textAlign: 'center', padding: '0 90px'}}>
            Your trading journey starts today.
          </div>
        </Rise>
        <Pop delay={20}>
          <div
            style={{
              background: COLORS.gold,
              color: COLORS.bg,
              fontWeight: 800,
              fontSize: 46,
              padding: '30px 70px',
              borderRadius: 999,
              boxShadow: `0 0 60px ${COLORS.gold}55`,
            }}
          >
            Download FX Globals →
          </div>
        </Pop>
      </AbsoluteFill>
      <Disclaimer bottom={60} size={24} />
    </Backdrop>
  </SceneFade>
);

export const MarketingSocialAd: React.FC = () => (
  <Series>
    <S durationInFrames={135}>
      <HookScene duration={135} />
    </S>
    <S durationInFrames={140}>
      <ValueScene
        duration={140}
        text="One app. Everything you need."
        hl={['Everything']}
        screen={<HomeScreen delay={12} />}
      />
    </S>
    <S durationInFrames={150}>
      <RapidScene duration={150} />
    </S>
    <S durationInFrames={140}>
      <ValueScene
        duration={140}
        text="Learn from real market setups"
        hl={['real']}
        screen={<SignalScreen delay={12} />}
      />
    </S>
    <S durationInFrames={155}>
      <CtaScene duration={155} />
    </S>
  </Series>
);

export const MARKETING_SOCIAL_DURATION = 135 + 140 + 150 + 140 + 155;
