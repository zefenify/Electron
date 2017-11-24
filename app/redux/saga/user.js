/* eslint no-console: off */
/* eslint no-underscore-dangle: off */

import localforage from 'localforage';
import { put, takeEvery } from 'redux-saga/effects';

import { LF_STORE } from '@app/config/localforage';
import { USER_REQUEST } from '@app/redux/constant/user';

import { user } from '@app/redux/action/user';

function* userBootFromLF() {
  try {
    const lfUser = yield localforage.getItem(LF_STORE.USER);
    yield put(user(lfUser));
  } catch (err) {
    console.warn('Unable to boot user from LF', err);
  }
}

function* _user(action) {
  yield put(user(action.payload));

  try {
    yield localforage.setItem(LF_STORE.USER, action.payload);
  } catch (err) {
    console.warn('Unable to save user state to LF', err);
  }
}

function* userRequest() {
  yield takeEvery(USER_REQUEST, _user);
}

module.exports = {
  userBootFromLF,
  userRequest,
};
