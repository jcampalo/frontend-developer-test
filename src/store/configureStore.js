import {
  createStore, applyMiddleware, compose
} from 'redux';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { createEpicMiddleware } from 'redux-observable';

export default function configureStore(
  initialState = {},
  epics,
  createReducer,
) {
  const epic$ = new BehaviorSubject(epics);
  const epicMiddleware = createEpicMiddleware();
  const middlewares = [epicMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(createReducer(), initialState, compose(...enhancers));

  epicMiddleware.run((...args) => epic$.pipe(switchMap(epic => epic(...args))));

  // Extensions
  store.epic$ = epic$;
  store.injectedReducers = {};
  store.injectedEpics = {};
  store.createReducer = createReducer;

  return store;
}
