/* global window */
/* where captured media keys fire appropriate dispatches */

import store from '@app/redux/store';
import { NEXT_REQUEST, PREVIOUS_REQUEST, PLAY_PAUSE_REQUEST } from '@app/redux/constant/wolfCola';

window.MEDIA_KEYS = {
  playPause() {
    store.dispatch({ type: PLAY_PAUSE_REQUEST });
  },

  next() {
    store.dispatch({ type: NEXT_REQUEST });
  },

  previous() {
    store.dispatch({ type: PREVIOUS_REQUEST });
  },
};
