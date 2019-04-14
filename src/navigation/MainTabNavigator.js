import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import WallScreen from '../screens/WallScreen';

const WallStack = createStackNavigator({
  Wall: WallScreen,
});

WallStack.navigationOptions = {
  tabBarLabel: 'Wall'
};

export default createBottomTabNavigator({
  WallStack,
});
