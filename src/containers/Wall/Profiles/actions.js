import { actionTypes as at } from './constants';

export const setCurrent = ({ key, id }) => ({
  type: at.SET_CURRENT,
  payload: { key, id }
});

export const accept = ({ key }) => ({
  type: at.ACCEPT,
  payload: { key }
});

export const dismiss = ({ key }) => ({
  type: at.DISMISS,
  payload: { key }
});

export const deleteCurrent = ({ key, nextKey }) => ({
  type: at.DELETE_CURRENT,
  payload: { key, nextKey }
});
