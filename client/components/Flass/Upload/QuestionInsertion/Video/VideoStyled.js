import styled from 'styled-components';
import media from '../../../../../css/styled/base/media';

const playerHeight = 30.25;
const borderWidth = 0.1875;

export const VideoStyled = {
  Container: styled.div`
    position: relative;
    height: ${playerHeight}rem;
    border-radius: ${borderWidth}rem;
  `,
  ControllerBar: styled.div`
    position: absolute;
    width: 100%;
    margin: 0 auto;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0;
    transition: opacity 1s ease-out;
    transition-delay: 1s;

    &:hover {
      opacity: 1;
      transition: opacity 1s ease-out;
    }

    ${media.atLargeForControllerbar`
      width: 54rem;
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
  border-radius: ${borderWidth}rem;
  height: ${playerHeight}rem;
`;

export const EndedPageOnUploadPage = props => {
  const { isOpen } = props;

  return {
    Container: `
      position: absolute;
      top: 0;
      width: ${isOpen ? '100%' : 0};
      height: ${isOpen ? playerHeight : 0}rem;
      opacity: ${isOpen ? 1 : 0};
      z-index: ${isOpen ? 10 : -10};
      background-color: black;
      border-radius: ${borderWidth}rem;
      transition: opacity .5s ease-out;
    `,
    Title: `
      margin-top: 9.25rem;
      color: white;
      text-align: center;
      font-size: 1.5714rem;
      font-weight: 500;
    `,
    ReplayBtn: `
      position: relative;
      margin-top: 1.875rem;
      width: 4.6875rem;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
    `,
    BtnLabel: `
      margin-top: 0.6875rem;
      color: white;
      text-align: center;
      font-size: 1.4285rem;
      font-weight: 500;
    `
  };
};
