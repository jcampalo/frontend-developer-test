import React from 'react';
import { Animated, View } from 'react-native';

import * as S from './styled';

const AnimatedWrapper = Animated.createAnimatedComponent(S.Wrapper);
const AnimatedImage = Animated.createAnimatedComponent(View);

const Photos = ({ photos, scrollState }) => {
  return (
    <AnimatedWrapper
      pagingEnabled
      style={{
        transform: [{
          translateY: scrollState.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -40],
          }),
        }]
      }}
    >
      <AnimatedImage style={{
        transform: [{
          scaleY: scrollState.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.1],
          }),
        }, {
          scaleX: scrollState.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.1],
          })
        }]
      }}
      >
        {photos.map(({
          url,
          width,
          height
        }) => (
          <S.Image
            key={url}
            source={{ uri: url }}
            width={width}
            height={height}
            resizeMode="cover"
            resizeMethod="scale"
          />
        ))}
      </AnimatedImage>
    </AnimatedWrapper>
  );
};

export default Photos;
