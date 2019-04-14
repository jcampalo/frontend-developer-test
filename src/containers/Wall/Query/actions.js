import { actionTypes as at } from './constants';

export const fetch = ({ url }) => ({
  type: at.FETCH,
  payload: { url }
});

export const fetchSuccess = ({ data }) => ({
  type: at.FETCH_SUCCESS,
  payload: { data },
});

export const fetchError = ({ error }) => ({
  type: at.FETCH_ERROR,
  payload: { error },
});
