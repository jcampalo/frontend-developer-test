import { combineEpics } from 'redux-observable';

export const injectEpicFactory = store => (key, epic) => {
  const hasEpics = Reflect.has(store.injectedEpics, key) && epic;

  if (!hasEpics) {
    store.injectedEpics[key] = epic; // eslint-disable-line no-param-reassign

    store.epic$.next(combineEpics(...Object.values(store.injectedEpics)));
  }
};

export default function getInjectors(store) {
  return {
    injectEpic: injectEpicFactory(store),
  };
}
