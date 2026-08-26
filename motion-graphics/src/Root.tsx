import React from 'react';
import {Composition} from 'remotion';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import {FPS} from './theme';
import {Tutorial1GettingStarted, TUTORIAL_1_DURATION} from './videos/Tutorial1GettingStarted';
import {Tutorial2Signals, TUTORIAL_2_DURATION} from './videos/Tutorial2Signals';
import {Tutorial3Rewards, TUTORIAL_3_DURATION} from './videos/Tutorial3Rewards';
import {MarketingSocialAd, MARKETING_SOCIAL_DURATION} from './videos/MarketingSocialAd';
import {MarketingBrandFilm, MARKETING_BRAND_DURATION} from './videos/MarketingBrandFilm';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="tutorial-1-getting-started"
      component={Tutorial1GettingStarted}
      durationInFrames={TUTORIAL_1_DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="tutorial-2-signals-analysis"
      component={Tutorial2Signals}
      durationInFrames={TUTORIAL_2_DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="tutorial-3-rewards"
      component={Tutorial3Rewards}
      durationInFrames={TUTORIAL_3_DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="marketing-social-ad"
      component={MarketingSocialAd}
      durationInFrames={MARKETING_SOCIAL_DURATION}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="marketing-brand-film"
      component={MarketingBrandFilm}
      durationInFrames={MARKETING_BRAND_DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
  </>
);
