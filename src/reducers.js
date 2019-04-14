/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux';

const mainReducer = (state = {}) => state;

/*
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    global: mainReducer,
    ...injectedReducers,
  });
}
