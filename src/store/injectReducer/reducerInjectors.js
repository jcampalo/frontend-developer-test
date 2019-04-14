const injectReducerFactory = store => (key, reducer) => {
  const { injectedReducers } = store;
  const hasReducer = Reflect.has(injectedReducers, key) && injectedReducers[key] === reducer;

  if (!hasReducer) {
    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign

    store.replaceReducer(store.createReducer(injectedReducers));
  }
};

export default function getInjectors(store) {
  return {
    injectReducer: injectReducerFactory(store),
  };
}
