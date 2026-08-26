import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {COLORS} from '../theme';
import {Backdrop, Kinetic, Rise, SceneFade, StepLabel} from '../components/core';
import {Candles, GlowLine} from '../components/charts';
import {MentorScreen, SignalScreen} from '../components/phone';
import {IntroScene, OutroScene, PhoneStepScene} from '../components/scenes';

const S = Series.Sequence;

// Full-screen animated chart scene with headline.
const ChartScene: React.FC<{duration: number}> = ({duration}) => (
  <SceneFade duration={duration}>
    <Backdrop>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 60, padding: '0 120px 60px'}}>
        <Kinetic
          text="Markets tell a story — learn to read it"
          size={72}
          delay={4}
          highlight={['read']}
        />
        <Rise delay={20}>
          <div
            style={{
              background: COLORS.panel,
              border: `1.5px solid ${COLORS.panelEdge}`,
              borderRadius: 28,
              padding: '50px 60px 40px',
              position: 'relative',
            }}
          >
            <div style={{position: 'absolute', top: 22, left: 40, display: 'flex', gap: 20, alignItems: 'baseline'}}>
              <span style={{fontSize: 30, fontWeight: 800, color: COLORS.white}}>EUR / USD</span>
              <span style={{fontSize: 24, fontWeight: 800, color: COLORS.green}}>▲ 1.0842</span>
            </div>
            <div style={{marginTop: 30}}>
              <Candles width={1250} height={420} delay={26} />
            </div>
          </div>
        </Rise>
      </AbsoluteFill>
    </Backdrop>
  </SceneFade>
);

// Anatomy of a signal: big labeled levels over a glowing line.
const AnatomyScene: React.FC<{duration: number}> = ({duration}) => {
  const rows = [
    ['ENTRY', '1.0842', 'Where the trade idea starts', COLORS.white],
    ['STOP-LOSS', '1.0810', 'Caps the downside — always set one', COLORS.red],
    ['TAKE-PROFIT', '1.0905', 'The target where profit is secured', COLORS.green],
  ] as const;
  return (
    <SceneFade duration={duration}>
      <Backdrop>
        <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 110, padding: '0 120px 90px'}}>
          <div style={{maxWidth: 820}}>
            <Kinetic text="Every signal, decoded" size={66} delay={4} align="left" highlight={['decoded']} />
            <div style={{marginTop: 46, display: 'flex', flexDirection: 'column', gap: 26}}>
              {rows.map(([k, v, desc, c], i) => (
                <Rise key={k} delay={20 + i * 12}>
                  <div
                    style={{
                      background: COLORS.panel,
                      border: `1.5px solid ${COLORS.panelEdge}`,
                      borderRadius: 20,
                      padding: '22px 30px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 30,
                    }}
                  >
                    <div style={{width: 210, fontSize: 24, fontWeight: 800, letterSpacing: '0.1em', color: c}}>
                      {k}
                    </div>
                    <div style={{fontSize: 34, fontWeight: 800, color: c, width: 170}}>{v}</div>
                    <div style={{fontSize: 24, color: COLORS.muted}}>{desc}</div>
                  </div>
                </Rise>
              ))}
            </div>
          </div>
          <Rise delay={14}>
            <div
              style={{
                background: COLORS.panel,
                border: `1.5px solid ${COLORS.panelEdge}`,
                borderRadius: 24,
                padding: 40,
              }}
            >
              <GlowLine width={560} height={380} delay={24} />
            </div>
          </Rise>
        </AbsoluteFill>
        <StepLabel step="STEP 2" title="Understand entry, stop & target" delay={20} />
      </Backdrop>
    </SceneFade>
  );
};

export const Tutorial2Signals: React.FC = () => (
  <Series>
    <S durationInFrames={130}>
      <IntroScene
        duration={130}
        kicker="TUTORIAL · EPISODE 2"
        title="Using Signals & Market Analysis"
        titleHighlight={['Signals', 'Analysis']}
      />
    </S>
    <S durationInFrames={210}>
      <ChartScene duration={210} />
    </S>
    <S durationInFrames={250}>
      <PhoneStepScene
        duration={250}
        step="STEP 1"
        stepTitle="Open today's signals"
        headline="Fresh setups, every day"
        headlineHighlight={['every']}
        bullets={['Pair, direction & key levels', 'Analysis attached to each one', 'Study the setup — then decide']}
        screen={<SignalScreen delay={15} />}
      />
    </S>
    <S durationInFrames={260}>
      <AnatomyScene duration={260} />
    </S>
    <S durationInFrames={240}>
      <PhoneStepScene
        duration={240}
        step="STEP 3"
        stepTitle="Ask the AI mentor"
        headline="Never act on what you don't understand"
        headlineHighlight={['understand']}
        bullets={['Question any signal before acting', 'Get the "why" behind the setup', 'Signals are lessons, not guarantees']}
        screen={<MentorScreen delay={15} />}
        phoneRight={false}
      />
    </S>
    <S durationInFrames={170}>
      <OutroScene duration={170} tagline="Read the market before you trade it." />
    </S>
  </Series>
);

export const TUTORIAL_2_DURATION = 130 + 210 + 250 + 260 + 240 + 170;
