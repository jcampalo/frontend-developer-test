import { actionTypes as at } from './constants';

export const initialState = {
  current: 0,
  dismissed: {},
  accepted: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case at.SET_CURRENT: {
      return {
        ...state,
        current: payload.index,
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
    default:
      return state;
  }
};

export default reducer;
