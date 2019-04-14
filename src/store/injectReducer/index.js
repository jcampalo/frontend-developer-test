import React, { Component } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './reducerInjectors';

export default function applyInjectReducer({ key, reducer }) {
  return (
    WrappedComponent: React.ComponentType,
  ) => {
    class ReducerInjector extends Component {
      static WrappedComponent = WrappedComponent;

      static contextTypes = {
        store: () => null,
      }

      static displayName = `withReducer(${WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component'})`;

      constructor(props, context) {
        super(props);

        const { injectReducer } = getInjectors(context.store);

        injectReducer(key, reducer);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };
}
