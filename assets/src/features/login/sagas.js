import Cookies from 'js-cookie';
import { put, takeLatest } from 'redux-saga/effects';
import * as actions from './slice';
import { login } from './api';

function* loginRequest(action) {
  try {
    const resp = yield login(action.payload);
    const { token, role } = resp || {};

    let expires = new Date();
    expires.setTime(expires.getTime() + 1 * 3600 * 1000);
    if (token) Cookies.set('jwt', token, { expires });
    if (role) Cookies.set('role', role, { expires });

    yield put(actions.loginSuccess({ token, role }));
  } catch(err) {
    const error = {
      msg: err.message,
      status: err.status,
    };

    yield put(actions.loginFailure({ error }));
  }
};

function* watchLogin() {
  yield takeLatest(actions.login.type, loginRequest);
}

export const sagas = {
  watchLogin,
};