import React from 'react';
import {AbsoluteFill, Series, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';
import {Backdrop, Kinetic, Pop, Rise, SceneFade} from '../components/core';
import {Confetti} from '../components/charts';
import {CoursesScreen, RewardsScreen} from '../components/phone';
import {IntroScene, OutroScene, PhoneStepScene} from '../components/scenes';

const S = Series.Sequence;

// Big counting points number with confetti burst.
const PointsScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const pts = Math.round(
    interpolate(frame, [15, 80], [0, 1250], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
  );
  return (
    <SceneFade duration={duration}>
      <Backdrop>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 30}}>
          <Rise>
            <div style={{fontSize: 30, fontWeight: 700, letterSpacing: '0.3em', color: COLORS.muted}}>
              EVERY LESSON EARNS
            </div>
          </Rise>
          <Pop delay={8}>
            <div
              style={{
                fontSize: 220,
                fontWeight: 800,
                color: COLORS.gold,
                textShadow: `0 0 80px ${COLORS.gold}66`,
                lineHeight: 1,
              }}
            >
              {pts.toLocaleString()}
            </div>
          </Pop>
          <Rise delay={14}>
            <div style={{fontSize: 42, fontWeight: 700, color: COLORS.white}}>points — and counting</div>
          </Rise>
        </AbsoluteFill>
        <Confetti delay={78} width={width} height={height} count={90} />
      </Backdrop>
    </SceneFade>
  );
};

// Three reward pillars.
const PillarsScene: React.FC<{duration: number}> = ({duration}) => {
  const items = [
    ['📚', 'Learn', 'Finish lessons & quizzes to earn points'],
    ['🏆', 'Compete', 'Join challenges & climb the leaderboard'],
    ['🎁', 'Redeem', 'Trade points for real rewards'],
  ] as const;
  return (
    <SceneFade duration={duration}>
      <Backdrop>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 70, padding: '0 100px'}}>
          <Kinetic text="Learning becomes a habit" size={72} delay={4} highlight={['habit']} />
          <div style={{display: 'flex', gap: 50}}>
            {items.map(([icon, t, d], i) => (
              <Pop key={t} delay={18 + i * 10}>
                <div
                  style={{
                    width: 480,
                    background: COLORS.panel,
                    border: `1.5px solid ${COLORS.panelEdge}`,
                    borderRadius: 28,
                    padding: '48px 40px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{fontSize: 76}}>{icon}</div>
                  <div style={{fontSize: 42, fontWeight: 800, color: COLORS.gold, margin: '18px 0 10px'}}>{t}</div>
                  <div style={{fontSize: 27, color: COLORS.muted, lineHeight: 1.4}}>{d}</div>
                </div>
              </Pop>
            ))}
          </div>
        </AbsoluteFill>
      </Backdrop>
    </SceneFade>
  );
};

export const Tutorial3Rewards: React.FC = () => (
  <Series>
    <S durationInFrames={130}>
      <IntroScene
        duration={130}
        kicker="TUTORIAL · EPISODE 3"
        title="Points, Challenges & Rewards"
        titleHighlight={['Rewards']}
      />
    </S>
    <S durationInFrames={200}>
      <PointsScene duration={200} />
    </S>
    <S durationInFrames={240}>
      <PhoneStepScene
        duration={240}
        step="STEP 1"
        stepTitle="Earn as you learn"
        headline="Points for every lesson you finish"
        headlineHighlight={['Points']}
        bullets={['Complete lessons & quizzes', 'Keep your daily streak alive', 'Watch your total grow']}
        screen={<CoursesScreen delay={15} />}
      />
    </S>
    <S durationInFrames={230}>
      <PillarsScene duration={230} />
    </S>
    <S durationInFrames={250}>
      <PhoneStepScene
        duration={250}
        step="STEP 2"
        stepTitle="Challenges & redeeming"
        headline="Compete, climb, cash in your points"
        headlineHighlight={['points']}
        bullets={['Join live learning challenges', 'Track your rank on the leaderboard', 'Redeem for courses & rewards']}
        screen={<RewardsScreen delay={15} />}
        phoneRight={false}
      />
    </S>
    <S durationInFrames={160}>
      <OutroScene duration={160} tagline="The more you learn, the more you earn." />
    </S>
  </Series>
);

export const TUTORIAL_3_DURATION = 130 + 200 + 240 + 230 + 250 + 160;
