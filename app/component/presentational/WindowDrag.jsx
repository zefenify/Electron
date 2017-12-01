import React from 'react';
import { shape } from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'react-emotion';

import { ChevronLeft, ChevronRight } from '@app/component/presentational/SVG';
import { ClearButton } from '@app/component/styled/Button';

const WindowDrag = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 32px;
  z-index: 9999;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.navbarBackground},
    ${props => props.theme.navbarBackground} 200px,
    ${props => props.theme.listBackground} 0px,
    ${props => props.theme.listBackground}
  );
  color: ${props => props.theme.listText};
  -webkit-app-region: drag;
  transform: translate3d(0, -32px, 0);
  transition: transform 256ms;
  will-change: transform;

  .navigation {
    display: flex;
    flex-direction: row;
    height: 32px;
    margin-left: 200px;
    padding-left: calc(2rem - 12px);

    & > button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 1.5em;
      width: 32px;
      transform: translate3d(0, 0, 0);
      transition: transform 128ms;
      will-change: transform;

      &:first-child:active {
        transform: translate3d(-4px, 0, 0);
      }

      &:last-child:active {
        transform: translate3d(4px, 0, 0);
      }
    }

    &__back {
      text-align: left;
    }

    &__forward {
      text-align: right;
    }
  }

  .divider {
    border: none;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      to right,
      ${props => props.theme.navbarBackground},
      ${props => props.theme.navbarBackground} 200px,
      ${props => props.theme.listDivider} 0px,
      ${props => props.theme.listDivider}
    );
  }
`;

const WindowDragWrapped = ({ history }) => (
  <WindowDrag id="wolf-cola-drag">
    <div className="navigation">
      <ClearButton onClick={() => history.goBack()} className="navigation__back">
        <ChevronLeft />
      </ClearButton>

      <ClearButton onClick={() => history.goForward()} className="navigation__forward">
        <ChevronRight />
      </ClearButton>
    </div>

    <div className="divider" />
  </WindowDrag>
);

WindowDragWrapped.propTypes = {
  history: shape({}).isRequired,
};

module.exports = withRouter(WindowDragWrapped);
