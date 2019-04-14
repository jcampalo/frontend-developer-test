import React, { Component } from 'react';
import { Animated } from 'react-native';

import Photos from './Photos';
import Info from './Info';
import * as S from './styled';

const AnimatedWrapper = Animated.createAnimatedComponent(S.Wrapper);

class Element extends Component {
  state = {
    scrollY: new Animated.Value(0),
    isVisible: new Animated.Value(1)
  }

  shouldComponentUpdate(nextProps) {
    const { shouldDelete } = this.props;

    return shouldDelete !== nextProps.shouldDelete;
  }

  componentDidUpdate(prevProps) {
    const { shouldDelete } = this.props;
    const { isVisible } = this.state;

    if (prevProps.shouldDelete !== shouldDelete) {
      Animated.timing(isVisible, {
        toValue: shouldDelete ? 0 : 1,
        duration: shouldDelete ? 300 : 0,
        useNativeDriver: true,
      }).start(this.handleAnimationFinish);
    }
  }

  handleAnimationFinish = () => {
    const { index, onAntimationFinish } = this.props;

    if (onAntimationFinish) {
      onAntimationFinish({ index });
    }
  }

  getIterpolate = ({ scrollY }) => {
    const inputRange = [
      0,
      50,
    ];
    const outputRange = [0, 1];

    return scrollY.interpolate({
      inputRange,
      outputRange,
    });
  }

  render() {
    const {
      photos,
      info,
      index
    } = this.props;
    const { scrollY, isVisible } = this.state;

    if (!info) {
      return (
        <S.Wrapper>
          <S.Text>{index}</S.Text>
        </S.Wrapper>
      );
    }
    const scrollState = this.getIterpolate(this.state);

    return (
      <AnimatedWrapper
        bounces={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: {
                y: scrollY
              }
            }
          }], {
            useNativeDriver: true
          }
        )}
        style={{
          opacity: isVisible,
          transform: [{
            translateY: isVisible.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          }]
        }}
      >
        <Photos photos={photos} scrollState={scrollState} />
        <Info info={info} scrollState={scrollState} />
      </AnimatedWrapper>
    );
  }
}

export default Element;
