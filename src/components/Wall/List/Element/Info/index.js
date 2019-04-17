import React, { Fragment } from 'react';

import { Animated } from 'react-native';

import * as S from './styled';

const AnimatedWrapper = Animated.createAnimatedComponent(S.Wrapper);

const LABELS = {
  about: 'About',
  desires: 'Desires',
  interests: 'Interests',
};

const Info = ({ info, scrollState }) => {
  const elements = Object.keys(LABELS).map((key) => {
    const values = info[key];

    if (values) {
      return (
        <Fragment key={key}>
          <S.Label>{LABELS[key]}</S.Label>
          <S.Text>
            {Array.isArray(values) ? (
              values.reduce((acc, value) => `${acc}${value} `, '')
            ) : values}
          </S.Text>
        </Fragment>
      );
    }

    return undefined;
  });

  return (
    <AnimatedWrapper
      style={{
        transform: [{
          translateY: scrollState.interpolate({
            inputRange: [0, 2],
            outputRange: [0, -40],
          }),
        }]
      }}
    >
      <S.TextName>{info.name}</S.TextName>
      <S.Text>{info.age} / {info.type} / {info.gender} / {info.sexuality}</S.Text>
      {elements}
    </AnimatedWrapper>
  );
};

export default Info;
