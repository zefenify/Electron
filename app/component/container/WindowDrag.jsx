import React, { useContext } from 'react';
import { shape } from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'react-emotion';

import { Context } from '@app/component/context/context';
import Spinner from '@app/component/presentational/Spinner';
import { ClearButton } from '@app/component/styled/Button';
import ChevronLeft from '@app/component/svg/ChevronLeft';
import ChevronRight from '@app/component/svg/ChevronRight';


const WindowDragContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 32px;
  z-index: 9999;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.BACKGROUND_NAVIGATION},
    ${props => props.theme.BACKGROUND_NAVIGATION} 220px,
    ${props => props.theme.BACKGROUND_MAIN} 0px,
    ${props => props.theme.BACKGROUND_MAIN}
  );
  color: ${props => props.theme.NATURAL_2};
  -webkit-app-region: drag;
  transform: translate3d(0, 0, 0);
  transition: transform 256ms;

  .WindowDragContainer__navigation {
    height: 31px;
    margin-left: 220px;
    padding-left: 2rem;

    & > button {
      width: 32px;
      transform: translate3d(0, 0, 0);
      transition: transform 128ms;

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

  .WindowDragContainer__divider {
    border: none;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      to right,
      ${props => props.theme.BACKGROUND_NAVIGATION},
      ${props => props.theme.BACKGROUND_NAVIGATION} 220px,
      ${props => props.theme.BACKGROUND_CONTROL} 0px,
      ${props => props.theme.BACKGROUND_CONTROL}
    );
  }
`;


const WindowDrag = ({ history }) => {
  const { loading } = useContext(Context);

  return (
    <WindowDragContainer className="d-flex flex-column" id="wolf-cola-drag">
      <Spinner loading={loading} />

      <div className="d-flex flex-row WindowDragContainer__navigation">
        <ClearButton onClick={() => history.goBack()} className="d-flex flex-row align-items-center p-0 m-0 WindowDragContainer__navigation__back">
          <ChevronLeft />
        </ClearButton>

        <ClearButton onClick={() => history.goForward()} className="d-flex flex-row align-items-center p-0 m-0 WindowDragContainer__navigation__forward">
          <ChevronRight />
        </ClearButton>
      </div>

      <div className="WindowDragContainer__divider" />
    </WindowDragContainer>
  );
};

WindowDrag.propTypes = {
  history: shape({}).isRequired,
};


export default withRouter(WindowDrag);
