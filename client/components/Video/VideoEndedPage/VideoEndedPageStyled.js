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
    background-color: black;
    border-radius: 3px;
    transition: opacity .5s ease-out;
  `,
  Title: styled.div`
    margin-top: 196px;
    color: white;
    text-align: center;
    font-size: 29px;
    font-weight: 500;
  `,
  ReplayBtn: styled.img`
    position: relative;
    margin-top: 34px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  `,
  BtnLabel: styled.div`
    margin-top: 14px;
    color: white;
    text-align: center;
    font-size: 22px;
    font-weight: 500;
  `
};
