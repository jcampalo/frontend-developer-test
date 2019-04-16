import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import {
  mergeMap,
  switchMap,
  takeUntil,
  catchError,
  timeout,
  pluck
} from 'rxjs/operators';

import request from '../../../helpers/request';
import { actionTypes as at } from './constants';
import { fetchSuccess, fetchError } from './actions';

export const onFetch = action$ => action$.pipe(
  ofType(at.FETCH),
  switchMap(() => request({
    url: '/v1/users'
  }).pipe(
    timeout(40000),
    takeUntil(action$.pipe(ofType(at.CANCEL))),
    pluck('data'),
    mergeMap(data => of(
      Object.entries(data).reduce((acc, [key, item]) => ({
        ...acc,
        [`el${key}`]: {
          ...item,
          key: `el${key}`,
        }
      }), {})
    )),
    mergeMap(data => [
      fetchSuccess({ data }),
    ]),
    catchError(error => of(fetchError({ error }))),
  )),
);

export default combineEpics(onFetch);
