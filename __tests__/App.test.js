import 'react-native';
import React from 'react';
import { create } from 'react-test-renderer';

import App from '../App';

jest.mock('../src/RootComponent', () => 'RootComponent');

describe('App', () => {
  describe('render', () => {
    it('should render loading', () => {
      const tree = create(<App />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render root component when skip', () => {
      const tree = create(
        <App skipLoadingScreen />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
