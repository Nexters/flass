import styled from 'styled-components';
import media from '../../../styled-components/base/media';

const playerHeight = 484;
const progressbarHeight = 80;

export const VideoStyled = {
  Container: styled.div`
    position: relative;
    height: ${playerHeight}px;
    border-radius: 3px;
  `,
  ControllerBar: styled.div`
    position: absolute;
    width: 100%;
    margin: 0 auto;
    height: ${progressbarHeight}px;
    top: ${playerHeight - progressbarHeight - 1}px;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .32);

    ${media.atLargeForControllerbar`
      width: 864px;
      margin: 0 auto;
      left: 0;
      right: 0;
    `};

    ${media.atMediumForControllerbar`
      width: 100%;
    `}
  `
};

export const StyledPlayerOnUploadPage = `
  width: 100%;
  border-radius: 3px;
  height: 484px;
`;

export const EndedPageOnUploadPage = props => {
  const { isOpen } = props;

  return {
    Container: `
      position: absolute;
      top: 0;
      width: ${isOpen ? '100%' : 0};
      height: ${isOpen ? 484 : 0}px;
      opacity: ${isOpen ? 1 : 0};
      z-index: ${isOpen ? 10 : -10};
      background-color: black;
      border-radius: 3px;
      transition: opacity .5s ease-out;
    `,
    Title: `
      margin-top: 196px;
      color: white;
      text-align: center;
      font-size: 29px;
      font-weight: 500;
    `,
    ReplayBtn: `
      position: relative;
      margin-top: 34px;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
    `,
    BtnLabel: `
      margin-top: 14px;
      color: white;
      text-align: center;
      font-size: 22px;
      font-weight: 500;
    `
  };
};
