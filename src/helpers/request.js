import { ajax } from 'rxjs/ajax';
import {
  pluck,
  catchError,
  _throw
} from 'rxjs/operators';
import API from '../constants/API';

export default function request({ url, config }) {
  return ajax({
    ...config,
    url: `${API.url}${url}`,
    headers: {
      'session-token': API.session
    },
  }).pipe(
    pluck('response'),
    catchError(error => _throw(error)),
  );
}
