import { createSelector } from 'reselect';

import { selectData } from '../Query/selectors';
import { KEY } from './constants';
import { initialState } from './reducer';

const selectStore = state => state[KEY] || initialState;

const selectDismissed = () => createSelector(
  selectStore,
  ({ dismissed }) => dismissed,
);

const selectAccepted = () => createSelector(
  selectStore,
  ({ accepted }) => accepted,
);

const selectDeleted = () => createSelector(
  selectStore,
  ({ deleted }) => deleted,
);

const selectCurrent = () => createSelector(
  selectStore,
  selectData(),
  ({ current }, data) => {
    if (current) {
      const element = Object.keys(data)[current];

      return {
        key: element,
        id: data[element].id
      };
    }

    if (data) {
      const firstElement = Object.keys(data)[0];

      return {
        key: firstElement,
        id: data[firstElement].id
      };
    }

    return {};
  },
);

const selectUsers = () => createSelector(
  selectData(),
  selectCurrent(),
  selectAccepted(),
  selectDismissed(),
  selectDeleted(),
  (data, current, accepted, dismissed, deleted) => {
    if (data) {
      return Object.entries(data).reduce(
        (acc, [key, value]) => {
          if (!deleted[key]) {
            acc.push({
              key,
              isCurrent: current.key === key,
              isAccepted: !!accepted[key],
              isDismissed: !!dismissed[key],
              ...value
            });
          }

          return acc;
        },
        []
      );
    }

    return [];
  },
);

export {
  selectStore,
  selectDismissed,
  selectAccepted,
  selectDeleted,
  selectCurrent,
  selectUsers,
};
