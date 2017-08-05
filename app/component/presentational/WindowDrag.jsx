import React from 'react';
import { shape } from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'emotion/react';

const WindowDrag = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 32px;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.navbarBackground},
    ${props => props.theme.navbarBackground} 220px,
    ${props => props.theme.listBackground} 0px,
    ${props => props.theme.listBackground}
  );
  color: ${props => props.theme.listText};
  -webkit-app-region: drag;

  .navigation {
    margin-left: 220px;
    display: flex;
    flex-direction: row;
    padding-left: 2em;

    & > div {
      font-size: 1.5em;
      width: 20px;

      &:active {
        transform: scale(0.9);
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
      <div onClick={() => history.goBack()} className="navigation__back icon-ion-ios-arrow-left" />
      <div onClick={() => history.goForward()} className="navigation__forward icon-ion-ios-arrow-right" />
    </div>
  </WindowDrag>
);

WindowDragWrapped.propTypes = {
  history: shape({}).isRequired,
};

module.exports = withRouter(WindowDragWrapped);
