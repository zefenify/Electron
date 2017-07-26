import React from 'react';
import { func, bool, string, number, oneOfType, object } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'emotion/react';

import { BASE } from '@app/config/api';
import { human } from '@app/util/time';

import { ControlsContainer } from '@app/component/styled/WolfCola';
import Range from '@app/component/styled/Range';

const NowPlayingWrapper = styled.div`
  flex: 0 1 250px;
  max-width: 250px;
  padding-left: 6px;
  display: flex;
  align-items: center;

  .song {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 250px;

    &__artwork {
      flex: 0 0 60px;
      width: 60px;
      height: 60px;
      border-radius: 4px;
      border: 1px solid rgba(51, 51, 51, 0.25);
    }

    &__name {
      padding-left: 6px;
      flex: 0 0 184px;
    }
  }

  .song-name {
    display: flex;
    flex-direction: column;

    &__name,
    &__artist {
      padding: 0;
      margin: 0;
      width: 184px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-decoration: none;
    }

    &__name {
      margin-bottom: 0.5em;
      color: ${props => props.theme.controlText};
    }

    &__artist {
      color: ${props => props.theme.controlMute};
    }
  }
`;

const MusicControlsWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

const MusicControls = styled.div`
  flex: 0 0 40px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  font-size: 1.75em;
  padding-bottom: 0.2em;

  .control {
    position: relative;
    display: flex;

    &:hover {
      transform: scale(1.2);
    }

    &_active {
      color: ${props => props.theme.primary};
    }

    &__state {
      position: absolute;
      left: 50%;
      width: 14px;
      height: 14px;
      padding: 0.25em 0.5em;
      border-radius: 50%;
      background-color: ${props => props.theme.primary};
      color: #fff;
      font-size: 9px;
      margin: 0 auto;
      text-align: center;
    }
  }

  & [class^="icon-"] {
    padding: 0 1em;
  }
`;

const MusicProgress = styled.div`
  flex: 0 0 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: default;
`;

const VolumeWrapper = styled.div`
  flex: 0 1 175px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  [class^="icon-"] {
    padding: 0 0.5em;
  }
`;

const Control = ({
  current,
  togglePlayPause,
  next,
  previous,
  playing,
  shuffle,
  repeat,
  volume,
  remaining,
  duration,
  playbackPosition,
  seek,
  toggleShuffle,
  toggleRemaining,
  setVolume,
  muteVolume,
  maxVolume,
  setRepeat,
}) => (
  <ControlsContainer>
    <NowPlayingWrapper>
      {
        current !== null
          ? (
            <div className="song">
              <div className="song__artwork" style={{ background: `transparent url('${BASE}${current.thumbnail}') 50% 50% / cover no-repeat` }} />
              <div className="song__name song-name">
                <p className="song-name__name">{ current.songName }</p>
                <Link to={`/artist/${current.artistId}`} className="song-name__artist">{ current.artistName }</Link>
              </div>
            </div>
          ) : null
      }
    </NowPlayingWrapper>

    <MusicControlsWrapper>
      <MusicControls>
        <div className={`control ${shuffle ? 'control_active' : ''}`} onClick={toggleShuffle}>
          <i className="icon-ion-ios-shuffle-strong" />
        </div>

        <div className="control" onClick={previous}>
          <i className="icon-ion-ios-skipbackward" />
        </div>

        <div className="control" onClick={togglePlayPause}>
          <i className={`icon-ion-ios-${playing ? 'pause' : 'play'}`} />
        </div>

        <div className="control" onClick={next}>
          <i className="icon-ion-ios-skipforward" />
        </div>

        <div className={`control ${repeat === 'OFF' ? '' : 'control_active'}`} onClick={setRepeat}>
          <i className="icon-ion-ios-loop-strong" />
          <div className="control__state" style={{ opacity: repeat === 'ONE' ? 1 : 0 }}>1</div>
        </div>
      </MusicControls>

      <MusicProgress>
        <small style={{ padding: '0 0.5em 0 8%' }}>
          {`${playbackPosition === null ? '0:00' : human(playbackPosition)} `}
        </small>

        <Range
          type="range"
          min="0"
          max={duration}
          step="1"
          value={playbackPosition}
          onChange={e => seek(e)}
        />

        <small style={{ padding: '0 8% 0 0.5em' }} onClick={toggleRemaining}>
          <span style={{ opacity: remaining ? 1 : 0 }}>-&nbsp;</span>
          <span>{`${remaining ? human(duration - playbackPosition) : human(duration)}`}</span>
        </small>
      </MusicProgress>
    </MusicControlsWrapper>

    <VolumeWrapper>
      <i className="icon-ion-ios-volume-low" style={{ fontSize: '2em' }} onClick={muteVolume} />
      <Range
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={e => setVolume(e)}
      />
      <i className="icon-ion-ios-volume-high" style={{ fontSize: '2em' }} onClick={maxVolume} />
    </VolumeWrapper>
  </ControlsContainer>
);

Control.propTypes = {
  current: oneOfType([object]),
  togglePlayPause: func.isRequired,
  next: func.isRequired,
  previous: func.isRequired,
  playing: bool,
  shuffle: bool,
  repeat: string,
  volume: number,
  remaining: bool,
  duration: number,
  playbackPosition: number,
  seek: func.isRequired,
  toggleShuffle: func.isRequired,
  toggleRemaining: func.isRequired,
  setVolume: func.isRequired,
  muteVolume: func.isRequired,
  maxVolume: func.isRequired,
  setRepeat: func.isRequired,
};

Control.defaultProps = {
  current: null,
  playing: false,
  shuffle: false,
  repeat: 'OFF',
  volume: 1,
  remaining: false,
  duration: 0,
  playbackPosition: 0,
};

module.exports = Control;
