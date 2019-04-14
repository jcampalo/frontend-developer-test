import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import {
  Platform, StatusBar
} from 'react-native';
import {
  AppLoading, Asset, Font, Icon
} from 'expo';
import RootComponent from './src/RootComponent';

const Wrapper = styled.View`
  flex: 1;
`;

class App extends PureComponent {
  state = {
    isLoadingComplete: false,
  };

  loadResourcesAsync = async () => {
    /* eslint-disable global-require */
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        roboto: require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
      }),
    ]);
    /* eslint-disable global-require */
  }

  handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  }

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  }

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }

    return (
      <Wrapper>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <RootComponent />
      </Wrapper>
    );
  }
}

export default App;
