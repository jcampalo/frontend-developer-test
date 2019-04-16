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

const selectUsers = () => createSelector(
  selectStore,
  selectData(),
  selectAccepted(),
  selectDismissed(),
  ({ current }, data, accepted, dismissed) => {
    if (data) {
      return Object.entries(data).reduce(
        (acc, [key, value], index) => {
          acc.push({
            key,
            isCurrent: current === index,
            isAccepted: !!accepted[key],
            isDismissed: !!dismissed[key],
            ...value
          });

          return acc;
        },
        []
      );
    }

    return [];
  },
);

const selectNotDeletedUsers = () => createSelector(
  selectUsers(),
  (users) => {
    if (users) {
      return users.filter(({ isAccepted, isDismissed }) => !(isDismissed || isAccepted));
    }

    return [];
  }
);

const selectIsEmpty = () => createSelector(
  selectNotDeletedUsers(),
  users => !users.length
);

const selectCurrent = () => createSelector(
  selectStore,
  selectNotDeletedUsers(),
  ({ current }, users) => {
    if (users) {
      const index = current > users.length - 1 ? users.length - 1 : current;
      const currentUser = users[index];

      if (currentUser) {
        const { key, id } = currentUser;

        return {
          index,
          key,
          id
        };
      }
    }

    return {};
  },
);

export {
  selectStore,
  selectDismissed,
  selectAccepted,
  selectDeleted,
  selectCurrent,
  selectIsEmpty,
  selectUsers,
};
