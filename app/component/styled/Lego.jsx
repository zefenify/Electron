import styled from '@emotion/styled';


// #context-overlay-container = [98, 100]
// #context-menu-container = 999
// #mobile = 1000
// #error = 9999
export const WolfColaContainer = styled.div`
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
  transition: transform 256ms;

  &.context-menu-active {
    opacity: 0.92;
    /* firefox chokes on blur */
    /* even only setting -webkit flag on fliter, Firefox picks it up */
    filter: blur(4px);
    transform: scale3d(0.96, 0.96, 1);
  }

  &.booting {
    opacity: 0;
    filter: blur(4px);
    transform: scale3d(0.96, 0.96, 1);
  }
`;


export const NavigationMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  height: calc(100vh - 122px); /* control: 90px + drag: 32px */
`;


export const NavigationContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 0 0 220px;
  width: 220px;
  background-color: ${props => props.theme.BACKGROUND_NAVIGATION};
  overflow-y: auto;

  .__navigation {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 1rem;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
  }
`;


export const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 0 calc(100vw - 220px);
  height: calc(100vh - 122px); /* control: 90px + drag: 32px */
  background-color: ${props => props.theme.BACKGROUND_MAIN};
  color: ${props => props.theme.NATURAL_2};
  overflow-y: auto;
  padding: 1em 2em;
  padding-bottom: 0;
  padding-top: 2em;
`;
