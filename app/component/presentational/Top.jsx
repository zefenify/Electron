import React from 'react';
import { arrayOf, shape, func, number, bool } from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'emotion/react';

import Divider from '@app/component/styled/Divider';
import Song from '@app/component/presentational/Song';
import PlaylistHeader from '@app/component/presentational/PlaylistHeader';

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ovefflow-y: auto;
  padding: 0 1em;

  .title {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 60px;
    padding: 0 1em;
    box-shadow: 0 0 4px 2px ${props => props.theme.navBarBoxShadow};
  }

  .list {
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    padding: 1em 2em;

    &__song {
      flex: 1 1 auto;

      & > *:last-child {
        margin-bottom: 1px;
      }
    }
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: ${props => props.theme.navbarText};
  padding: 0 1em;
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.navbarTextActive};
  }

  &.active {
    color: ${props => props.theme.navbarTextActive};
    border-bottom: 2px solid ${props => props.theme.primary};
    background-color: ${props => props.theme.listBackgroundHover};
  }
`;

const Top = ({
  most,
  current,
  playing,
  duration,
  playingTheSameMost,
  togglePlayPauseAll,
  togglePlayPauseSong,
}) => {
  if (most === null) {
    // repeating block to avoid the ? : in the _actual_ render
    return (
      <TopWrapper>
        <div className="title">
          <NavLinkStyled to="/top/recent">Most Recent</NavLinkStyled>
          <NavLinkStyled to="/top/liked">Most Liked</NavLinkStyled>
          <NavLinkStyled to="/top/played">Most Played</NavLinkStyled>
        </div>
      </TopWrapper>
    );
  }

  return (
    <TopWrapper>
      <div className="title">
        <NavLinkStyled to="/top/recent">Most Recent</NavLinkStyled>
        <NavLinkStyled to="/top/liked">Most Liked</NavLinkStyled>
        <NavLinkStyled to="/top/played">Most Played</NavLinkStyled>
      </div>

      <div className="list">
        <PlaylistHeader
          {...most}
          duration={duration}
          playing={(playing && playingTheSameMost)}
          togglePlayPause={togglePlayPauseAll}
        />

        <Divider />

        <div className="list__song">
          {
            most.songs.map((song, index) => (
              <Song
                key={song.songId}
                currentSongId={current === null ? -1 : current.songId}
                trackNumber={index + 1}
                togglePlayPause={togglePlayPauseSong}
                playing={playing}
                {...song}
              />
            ))
          }
        </div>
      </div>
    </TopWrapper>
  );
};

Top.propTypes = {
  most: arrayOf(shape({})),
  current: shape({}),
  playing: bool,
  duration: shape({
    hours: number,
    minutes: number,
    seconds: number,
  }),
  playingTheSameMost: bool,
  togglePlayPauseAll: func.isRequired,
  togglePlayPauseSong: func.isRequired,
};

Top.defaultProps = {
  most: null,
  current: null,
  playing: false,
  duration: {
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  playingTheSameMost: false,
};

module.exports = Top;