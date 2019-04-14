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
    /*
    mergeMap((response) => of({
      ...response,
      countries: response.countries
        ? response.countries.reduce((acc, country) => {
          if (acc.every(({ code }) => code !== country.code)) {
            acc.push(country);
          }

          return acc;
        }, []) : undefined,
      paymentOptions: response.paymentOptions
        ? response.paymentOptions.reduce((acc, paymentOption) => {
          if (acc.every(({ code }) => code !== paymentOption.code)) {
            acc.push(paymentOption);
          }

          return acc;
        }, []) : undefined,
    })),
    */
    pluck('data'),
    mergeMap(data => [
      fetchSuccess({ data }),
    ]),
    catchError(error => of(fetchError({ error }))),
  )),
);

export default combineEpics(onFetch);
