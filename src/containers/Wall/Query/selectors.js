import { createSelector } from 'reselect';

import { KEY } from './constants';
import { initialState } from './reducer';

const selectStore = state => state[KEY] || initialState;
// const emtpyPositions = Array(20).fill({ key: 0 }).map((_, key) => ({ key: `${key}` }));

const selectError = () => createSelector(
  selectStore,
  ({ error }) => error,
);

const selectIsLoading = () => createSelector(
  selectStore,
  ({ isLoading }) => isLoading,
);

const selectData = () => createSelector(
  selectStore,
  ({ data }) => data,
);

export {
  selectStore,
  selectError,
  selectIsLoading,
  selectData,
};
