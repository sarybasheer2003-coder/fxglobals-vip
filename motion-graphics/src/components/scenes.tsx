import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../theme';
import {Backdrop, Disclaimer, Kinetic, Logo, Pop, Rise, SceneFade, StepLabel} from './core';
import {PhoneMockup} from './phone';

// Series intro: logo pops, then episode title.
export const IntroScene: React.FC<{duration: number; kicker: string; title: string; titleHighlight?: string[]}> = ({
  duration,
  kicker,
  title,
  titleHighlight = [],
}) => (
  <SceneFade duration={duration}>
    <Backdrop>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 48}}>
        <Pop>
          <Logo size={110} />
        </Pop>
        <Rise delay={12}>
          <div
            style={{
              textAlign: 'center',
              fontSize: 27,
              fontWeight: 700,
              letterSpacing: '0.35em',
              color: COLORS.muted,
            }}
          >
            {kicker}
          </div>
        </Rise>
        <div style={{maxWidth: 1300, padding: '0 60px'}}>
          <Kinetic text={title} size={84} delay={20} highlight={titleHighlight} />
        </div>
      </AbsoluteFill>
    </Backdrop>
  </SceneFade>
);

// Phone on one side, headline + bullet points on the other, step chip below.
export const PhoneStepScene: React.FC<{
  duration: number;
  step?: string;
  stepTitle?: string;
  headline: string;
  headlineHighlight?: string[];
  bullets?: string[];
  screen: React.ReactNode;
  phoneRight?: boolean;
}> = ({duration, step, stepTitle, headline, headlineHighlight = [], bullets = [], screen, phoneRight = true}) => (
  <SceneFade duration={duration}>
    <Backdrop>
      <AbsoluteFill
        style={{
          flexDirection: phoneRight ? 'row' : 'row-reverse',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 110,
          padding: '0 120px 90px',
        }}
      >
        <div style={{maxWidth: 760}}>
          <Kinetic text={headline} size={64} delay={6} align="left" highlight={headlineHighlight} />
          <div style={{marginTop: 42, display: 'flex', flexDirection: 'column', gap: 22}}>
            {bullets.map((b, i) => (
              <Rise key={b} delay={22 + i * 8} from={24}>
                <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 4,
                      background: COLORS.gold,
                      transform: 'rotate(45deg)',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{fontSize: 32, color: COLORS.white, fontWeight: 500, opacity: 0.92}}>{b}</div>
                </div>
              </Rise>
            ))}
          </div>
        </div>
        <PhoneMockup height={800} delay={10} tilt={phoneRight ? 3 : -3}>
          {screen}
        </PhoneMockup>
      </AbsoluteFill>
      {step && stepTitle ? <StepLabel step={step} title={stepTitle} delay={16} /> : null}
    </Backdrop>
  </SceneFade>
);

// Closing card: logo, tagline, CTA, legal.
export const OutroScene: React.FC<{duration: number; tagline: string; cta?: string}> = ({
  duration,
  tagline,
  cta = 'Download FX Globals on the App Store & Google Play',
}) => (
  <SceneFade duration={duration}>
    <Backdrop>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 44}}>
        <Pop>
          <Logo size={120} />
        </Pop>
        <Rise delay={10}>
          <div style={{fontSize: 46, fontWeight: 700, color: COLORS.white, textAlign: 'center', maxWidth: 1200}}>
            {tagline}
          </div>
        </Rise>
        <Rise delay={20}>
          <div
            style={{
              background: COLORS.gold,
              color: COLORS.bg,
              fontWeight: 800,
              fontSize: 30,
              padding: '18px 44px',
              borderRadius: 999,
            }}
          >
            {cta}
          </div>
        </Rise>
      </AbsoluteFill>
      <Disclaimer />
    </Backdrop>
  </SceneFade>
);
