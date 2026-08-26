import React from 'react';
import {Series} from 'remotion';
import {CoursesScreen, HomeScreen, MentorScreen, SignupScreen} from '../components/phone';
import {IntroScene, OutroScene, PhoneStepScene} from '../components/scenes';

const S = Series.Sequence;

export const Tutorial1GettingStarted: React.FC = () => (
  <Series>
    <S durationInFrames={130}>
      <IntroScene
        duration={130}
        kicker="TUTORIAL · EPISODE 1"
        title="Getting Started with FX Globals"
        titleHighlight={['FX', 'Globals']}
      />
    </S>
    <S durationInFrames={240}>
      <PhoneStepScene
        duration={240}
        step="STEP 1"
        stepTitle="Create your account"
        headline="Sign up in under a minute"
        headlineHighlight={['minute']}
        bullets={['Download from the app store', 'Enter your email & password', 'Your data stays encrypted']}
        screen={<SignupScreen delay={20} />}
      />
    </S>
    <S durationInFrames={260}>
      <PhoneStepScene
        duration={260}
        step="STEP 2"
        stepTitle="Tour the home screen"
        headline="Everything lives in one place"
        headlineHighlight={['one']}
        bullets={['Courses to learn from zero', 'Signals & daily analysis', 'Your AI mentor & rewards']}
        screen={<HomeScreen delay={15} />}
        phoneRight={false}
      />
    </S>
    <S durationInFrames={250}>
      <PhoneStepScene
        duration={250}
        step="STEP 3"
        stepTitle="Start your first course"
        headline="Learn the markets step by step"
        headlineHighlight={['step']}
        bullets={['Short, focused lessons', 'Quizzes after every module', 'Track your progress']}
        screen={<CoursesScreen delay={15} />}
      />
    </S>
    <S durationInFrames={250}>
      <PhoneStepScene
        duration={250}
        step="STEP 4"
        stepTitle="Meet your AI mentor"
        headline="Stuck? Just ask"
        headlineHighlight={['ask']}
        bullets={['Answers any trading question', 'Available 24/7', 'Explains in plain language']}
        screen={<MentorScreen delay={15} />}
        phoneRight={false}
      />
    </S>
    <S durationInFrames={170}>
      <OutroScene duration={170} tagline="Learn forex the right way — from your first lesson to your first analysis." />
    </S>
  </Series>
);

export const TUTORIAL_1_DURATION = 130 + 240 + 260 + 250 + 250 + 170;
