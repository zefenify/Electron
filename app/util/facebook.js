/* global window */

import store from '@app/redux/store';
import api from '@app/util/api';

import { NOTIFICATION_ON_REQUEST } from '@app/redux/constant/notification';
import { FAUTH } from '@app/config/api';
import { SONG_BOOT_REQUEST } from '@app/redux/constant/song';
import { USER_REQUEST } from '@app/redux/constant/user';

window.ELECTRON.ipcRenderer.on('facebookAccessToken', (e, accessToken) => {
  api(`${FAUTH}${accessToken}`).then(({ data }) => {
    store.dispatch({
      type: USER_REQUEST,
      payload: data,
    });

    // TODO: booters
    // - [X] song
    // - [ ] playlist
    store.dispatch({
      type: SONG_BOOT_REQUEST,
    });
  }, () => {
    store.dispatch({
      type: NOTIFICATION_ON_REQUEST,
      payload: {
        message: 'ይቅርታ, Unable to reach Facebook server. Try again later',
      },
    });
  });
});

window.ELECTRON.ipcRenderer.on('facebookLoadError', () => {
  store.dispatch({
    type: NOTIFICATION_ON_REQUEST,
    payload: {
      message: 'Unable to reach Facebook server',
    },
  });
});

window.ELECTRON.ipcRenderer.on('facebookNoAccess', () => {
  store.dispatch({
    type: NOTIFICATION_ON_REQUEST,
    payload: {
      message: 'Access was not granted to Zefenify',
    },
  });
});
