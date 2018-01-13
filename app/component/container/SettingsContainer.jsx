/* global window */

import React from 'react';
import { connect } from 'react-redux';

import { THEME_REQUEST } from '@app/redux/constant/theme';
import { CROSSFADE_REQUEST } from '@app/redux/constant/crossfade';
import { USER_REQUEST } from '@app/redux/constant/user';
import { SONG } from '@app/redux/constant/song';

import DJKhaled from '@app/component/hoc/DJKhaled';
import Settings from '@app/component/presentational/Settings';

const SettingsContainer = props => (<Settings {...props} />);

module.exports = DJKhaled(connect(state => ({
  currentTheme: state.theme,
  currentCrossfade: state.crossfade,
  user: state.user,
}), dispatch => ({
  toggleTheme() {
    dispatch({
      type: THEME_REQUEST,
    });
  },

  crossfade(e) {
    dispatch({
      type: CROSSFADE_REQUEST,
      payload: Number.parseInt(e.target.value, 10),
    });
  },

  login() {
    const APP_ID = '470148740022518';
    const REDIRECT_URI = 'https://www.facebook.com/connect/login_success.html';
    window.open(`https://www.facebook.com/v2.11/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`);
  },

  logout() {
    dispatch({
      type: USER_REQUEST,
      payload: null,
    });

    dispatch({
      type: SONG,
      payload: null,
    });
  },
}))(SettingsContainer));
