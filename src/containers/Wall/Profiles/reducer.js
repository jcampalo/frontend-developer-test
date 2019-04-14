import { actionTypes as at } from './constants';

export const initialState = {
  current: null,
  dismissed: {},
  accepted: {},
  deleted: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case at.SET_CURRENT: {
      return {
        ...state,
        current: payload.key,
      };
    }
    case at.DISMISS: {
      return {
        ...state,
        dismissed: {
          ...state.dismissed,
          [payload.key]: payload.key
        },
      };
    }
    case at.ACCEPT: {
      return {
        ...state,
        accepted: {
          ...state.accepted,
          [payload.key]: payload.key
        },
      };
    }
    case at.DELETE_CURRENT: {
      return {
        ...state,
        deleted: {
          ...state.deleted,
          [payload.key]: payload.key
        },
        current: payload.nextKey,
      };
    }
    default:
      return state;
  }
};

export default reducer;
