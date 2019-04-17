import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isMediumSize: width >= 375 && width < 550,
  isLarge: width >= 550,
};
