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
  const elements = Object.keys(LABELS).map(key => (
    <Fragment key={key}>
      <S.Label>{LABELS[key]}</S.Label>
      <S.Text>
        {Array.isArray(info[key]) ? (
          info[key].reduce((acc, value) => `${acc}${value} `, '')
        ) : info[key]}
      </S.Text>
    </Fragment>
  ));

  return (
    <AnimatedWrapper
      style={{
        transform: [{
          translateY: scrollState.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -45],
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
