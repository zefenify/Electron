import styled from 'react-emotion';

// #context-overlay-container = [98, 100]
// #context-menu-container = 999
// #mobile = 1000
const WolfColaContainer = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 99;
  opacity: 1;
  filter: blur(0px);
  transform: scale3d(1, 1, 1);
  transition: transform 256ms, filter 256ms, opacity 256ms;
  will-change: transform, filter, opacity;

  &.context-menu-active {
    opacity: 0.92;
    filter: blur(4px);
    transform: scale3d(0.96, 0.96, 1);
  }

  &.booting {
    opacity: 0;
    filter: blur(4px);
    transform: scale3d(0.96, 0.96, 1);
  }
`;

const ControlsContainer = styled.div`
  flex: 0 0 70px;
  background-color: ${props => props.theme.controlBackground};
  color: ${props => props.theme.controlText};
  display: flex;
  flex-direction: row;
`;

const NavListContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
`;

// drag: 32px
// controls: 70px
const NavContainer = styled.div`
  position: relative;
  flex: 0 0 200px;
  height: calc(100vh - 102px);
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.navbarBackground};
  color: ${props => props.theme.navbarText};
  overflow-y: auto;
  overflow-x: hidden;

  .nav-list {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
  }

  .small-text {
    padding: 1em 0.5em;
    border-left: 1.25em solid transparent;
    font-size: 0.75em;
    margin-top: 2em;
    cursor: default;
  }
`;

const RouteContainer = styled.div`
  position: relative;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.listBackground};
  color: ${props => props.theme.listText};
  max-height: calc(100vh - 102px);
  max-width: calc(100vw - 200px);
  overflow-y: auto;
  padding: 1em 2em;
  padding-bottom: 0;
  padding-top: 2em;
`;

module.exports = {
  WolfColaContainer,
  ControlsContainer,
  NavListContainer,
  NavContainer,
  RouteContainer,
};
