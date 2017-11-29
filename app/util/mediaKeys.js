/* global window */
/* where captured media keys fire appropriate dispatches */

import store from '@app/redux/store';
import { NEXT_REQUEST, PREVIOUS_REQUEST, PLAY_PAUSE_REQUEST } from '@app/redux/constant/wolfCola';

window.ELECTRON.ipcRenderer.on('PlayPause', () => {
  store.dispatch({ type: PLAY_PAUSE_REQUEST });
});

window.ELECTRON.ipcRenderer.on('Next', () => {
  store.dispatch({ type: NEXT_REQUEST });
});

window.ELECTRON.ipcRenderer.on('Previous', () => {
  store.dispatch({ type: PREVIOUS_REQUEST });
});
