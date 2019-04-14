import React, { Component } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './epicInjectors';

export default function applyInjectEpic({ key, epic }) {
  return (WrappedComponent) => {
    class InjectEpic extends Component {
      static WrappedComponent = WrappedComponent;

      static contextTypes = {
        store: () => null,
      }

      static displayName = `withEpic(${WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component'})`;

      constructor(props, context) {
        super(props);

        const { injectEpic } = getInjectors(context.store);

        injectEpic(key, epic);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(InjectEpic, WrappedComponent);
  };
}
