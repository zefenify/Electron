/* global window */
import {
  put,
  fork,
  select,
  takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import localforage from 'localforage';

import { BASE, BASE_S3, HEADER } from '@app/config/api';
import { LOCALFORAGE_STORE } from '@app/config/localforage';
import { NOTIFICATION_ON_REQUEST } from '@app/redux/constant/notification';
import { SONG_SAVE_REQUEST, SONG_REMOVE_REQUEST, SONG_BOOT_REQUEST } from '@app/redux/constant/song';
import songTrack from '@app/redux/selector/songTrack';
import { song } from '@app/redux/action/song';
import { loading } from '@app/redux/action/loading';


/**
 * goes through songs -> download via yield, one at a time
 * call _download via fork
 *
 * @param {Array} songs
 */
function* _download(songs = []) {
  let i = 0;

  if (window.ELECTRON !== undefined) {
    while (i < songs.length) {
      yield window.ELECTRON.fileDownload(`${BASE_S3}${songs[i].track_track.s3_name}`);
      i += 1;
    }
  }
}


export function* songBoot() {
  const { user } = yield select();

  // no user, clearing song state...
  if (user === null) {
    yield put(song(null));
    return;
  }

  try {
    yield put(loading(true));

    const { data } = yield axios.get(`${BASE}song/like`, {
      headers: {
        [HEADER]: user === null ? undefined : user.jwt,
      },
    });

    yield put(loading(false));
    yield put(song(data));
    yield localforage.setItem(LOCALFORAGE_STORE.SONG, data);
    yield fork(_download, songTrack({ song: data }));
  } catch (songsError) {
    yield put(loading(false));

    // fetching from server failed, attempting boot from `localforage`...
    const localforageSong = yield localforage.getItem(LOCALFORAGE_STORE.SONG);

    yield put(song(localforageSong));

    if (songsError.message === 'Network Error') {
      yield put({
        type: NOTIFICATION_ON_REQUEST,
        payload: {
          message: 'No Internet Connection. Please Try Again Later',
        },
      });

      return;
    }

    yield put({
      type: NOTIFICATION_ON_REQUEST,
      payload: {
        message: 'ይቅርታ, Unable to Fetch Your Library',
      },
    });
  }
}


function* _songSave(action) {
  const state = yield select();

  if (state.song === null) {
    return;
  }

  const savedTrackIds = state.song.data.song_track;
  const trackId = action.payload.track_id;

  // track already saved, aborting...
  if (savedTrackIds.includes(trackId) === true) {
    return;
  }

  try {
    yield put(loading(true));

    const { data } = yield axios.patch(`${BASE}song/like`, {
      song_track: [trackId, ...savedTrackIds],
    }, {
      headers: {
        [HEADER]: state.user === null ? undefined : state.user.jwt,
      },
    });

    yield put(loading(false));
    yield put(song(data));
    yield localforage.setItem(LOCALFORAGE_STORE.SONG, data);
    yield fork(_download, songTrack({ song: data }));
  } catch (songsSaveError) {
    yield put(loading(false));

    if (songsSaveError.message === 'Network Error') {
      yield put({
        type: NOTIFICATION_ON_REQUEST,
        payload: {
          message: 'No Internet Connection. Please Try Again Later',
        },
      });

      return;
    }

    yield put({
      type: NOTIFICATION_ON_REQUEST,
      payload: {
        message: 'ይቅርታ, Unable to save Song to Your Library',
      },
    });
  }
}


function* _songRemove(action) {
  const state = yield select();

  if (state.song === null) {
    return;
  }

  const songPreviousState = cloneDeep(state.song); // to be used if song removal is successful
  const savedTrackIds = state.song.data.song_track;
  const trackId = action.payload.track_id;

  // track not saved, aborting...
  if (savedTrackIds.includes(trackId) === false) {
    return;
  }

  try {
    yield put(loading(true));

    const { data } = yield axios.patch(`${BASE}song/like`, {
      song_track: [
        ...savedTrackIds.slice(0, savedTrackIds.indexOf(trackId)),
        ...savedTrackIds.slice(savedTrackIds.indexOf(trackId) + 1),
      ],
    }, {
      headers: {
        [HEADER]: state.user === null ? undefined : state.user.jwt,
      },
    });

    yield put(loading(false));
    yield put(song(data));
    yield localforage.setItem(LOCALFORAGE_STORE.SONG, data);

    if (window.ELECTRON !== undefined) {
      const { s3, track } = songPreviousState.included;
      window.ELECTRON.fileDelete(s3[track[trackId].track_track].s3_name);
    }
  } catch (songRemoveError) {
    yield put(loading(false));

    if (songRemoveError.message === 'Network Error') {
      yield put({
        type: NOTIFICATION_ON_REQUEST,
        payload: {
          message: 'No Internet Connection. Please Try Again Later',
        },
      });

      return;
    }

    yield put({
      type: NOTIFICATION_ON_REQUEST,
      payload: {
        message: 'ይቅርታ, Unable to Remove Song from Your Library',
      },
    });
  }
}


export function* songBootRequest() {
  yield takeEvery(SONG_BOOT_REQUEST, songBoot);
}


export function* songSaveRequest() {
  yield takeEvery(SONG_SAVE_REQUEST, _songSave);
}


export function* songRemoveRequest() {
  yield takeEvery(SONG_REMOVE_REQUEST, _songRemove);
}
