import React, { PureComponent } from 'react';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppNavigator from './navigation/AppNavigator';
import epics from './epics';
import createReducer from './reducers';

class RootComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.store = configureStore({}, epics, createReducer);
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default RootComponent;
