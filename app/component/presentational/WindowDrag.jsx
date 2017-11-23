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
  border-bottom: 1px solid ${props => props.theme.listDivider};

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
      transform: scale3d(1, 1, 1);
      transition: transform 128ms;
      will-change: transform;

      &:active {
        transform: scale3d(0.9, 0.9, 1);
      }
    }

    &__back {
      text-align: left;
    }

    &__forward {
      text-align: right;
    }
  }
`;

const WindowDragWrapped = ({ history }) => (
  <WindowDrag>
    <div className="navigation">
      <ClearButton onClick={() => history.goBack()} className="navigation__back">
        <ChevronLeft />
      </ClearButton>

      <ClearButton onClick={() => history.goForward()} className="navigation__forward">
        <ChevronRight />
      </ClearButton>
    </div>
  </WindowDrag>
);

WindowDragWrapped.propTypes = {
  history: shape({}).isRequired,
};

module.exports = withRouter(WindowDragWrapped);