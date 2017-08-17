import styled from 'styled-components';

const $playerHeight = '650px';

export const VideoEndedPage = {
  Container: styled.div`
    position: absolute;
    top: 0;
    width: ${props => (props.isOpen ? '100%' : 0)};
    height: ${props => (props.isOpen ? $playerHeight : 0)};
    opacity: ${props => (props.isOpen ? 1 : 0)};
    z-index: ${props => (props.isOpen ? 10 : -10)};
    background-color: rgba(0, 0, 0, .32);
    border-radius: 3px;
    transition: opacity .5s ease-out;
  `,
  ReplayBtn: styled.img`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  `
};
