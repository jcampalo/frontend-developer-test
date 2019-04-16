import React, { Component } from 'react';
import { Animated } from 'react-native';

import Layout from '../../../../constants/Layout';
import Photos from './Photos';
import Info from './Info';
import * as S from './styled';

const WIDTH = Layout.window.width;
const AnimatedWrapper = Animated.createAnimatedComponent(S.Wrapper);

class Element extends Component {
  static defaultProps = {
    isDeleted: false
  }

  state = {
    scrollY: new Animated.Value(0),
    isVisible: new Animated.Value(1),
    isSlided: new Animated.Value(1),
  }

  shouldComponentUpdate(nextProps) {
    const {
      isDeleted
    } = this.props;

    return (isDeleted !== nextProps.isDeleted);
  }

  componentDidMount() {
    this.initAnimation();
  }

  componentDidUpdate() {
    this.initAnimation();
  }

  initAnimation() {
    const { isDeleted } = this.props;
    const { isVisible, isSlided } = this.state;

    if (isDeleted) {
      Animated.parallel([
        Animated.timing(isVisible, {
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(isSlided, {
          toValue: 0,
          duration: 500,
        })
      ]).start();
    }
  }

  render() {
    const {
      photos,
      info,
      isDeleted,
    } = this.props;
    const {
      scrollY,
      isVisible,
      isSlided
    } = this.state;
    const scrollState = scrollY.interpolate({
      inputRange: [
        0,
        50,
      ],
      outputRange: [0, 1],
    });

    return (
      <AnimatedWrapper
        pointerEvents={isDeleted ? 'none' : 'auto'}
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
          width: isSlided.interpolate({
            inputRange: [
              0,
              1,
            ],
            outputRange: [0, WIDTH],
          })
        }}
      >
        <Photos photos={photos} scrollState={scrollState} />
        <Info info={info} scrollState={scrollState} />
      </AnimatedWrapper>
    );
  }
}

export default Element;
