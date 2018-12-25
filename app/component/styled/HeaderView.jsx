import styled from '@emotion/styled';


const HeaderView = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 122px); /* control: 90px + drag: 32px */

  .__header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 2rem;
    box-shadow: 0 0 4px 2px ${props => props.theme.SHADOW};
  }

  .__view {
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: start;
    flex-wrap: wrap;
    overflow-y: auto;
    padding: 1rem 1rem 0 1rem;
    height: calc(100vh - 182px); /* header: 60px + control: 90px + drag: 32px */
    -webkit-overflow-scrolling: touch;
  }
`;


export default HeaderView;
