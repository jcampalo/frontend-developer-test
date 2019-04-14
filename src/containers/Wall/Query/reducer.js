import { actionTypes as at } from './constants';

export const initialState = {
  isLoading: true,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case at.FETCH: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    }
    case at.FETCH_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data || {},
          ...payload.data,
        },
        isLoading: false,
      };
    }
    case at.FETCH_ERROR: {
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
