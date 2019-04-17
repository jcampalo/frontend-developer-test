import React from 'react';
import { Animated, View } from 'react-native';

import Layout from '../../../../../constants/Layout';
import * as S from './styled';

const AnimatedWrapper = Animated.createAnimatedComponent(S.Wrapper);
const AnimatedImage = Animated.createAnimatedComponent(View);

const IMAGE_HEIGHT = Layout.window.height * 0.75;

const Photos = ({ photos, scrollState }) => {
  const scale = scrollState.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1.2, 1.2],
  });

  return (
    <AnimatedWrapper
      pagingEnabled
      style={{
        transform: [{
          translateY: scrollState.interpolate({
            inputRange: [0, 2],
            outputRange: [0, -40],
          }),
        }],
        height: IMAGE_HEIGHT,
      }}
    >
      <AnimatedImage
        style={{
          transform: [{
            scaleY: scale,
          }, {
            scaleX: scale
          }, {
            translateY: scrollState.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [0, IMAGE_HEIGHT * 0.2, IMAGE_HEIGHT * 0.2],
            }),
          }],
          height: IMAGE_HEIGHT,
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
