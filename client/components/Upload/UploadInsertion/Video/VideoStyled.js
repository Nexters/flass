import styled from 'styled-components';
import media from '../../../styled-components/base/media';

const playerHeight = 30.25;
const progressbarHeight = 5;
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
    height: ${progressbarHeight}rem;
    top: ${playerHeight - progressbarHeight}rem;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .32);

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
      margin-top: 12.25rem;
      color: white;
      text-align: center;
      font-size: 2.0714rem;
      font-weight: 500;
    `,
    ReplayBtn: `
      position: relative;
      margin-top: 2.125rem;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
    `,
    BtnLabel: `
      margin-top: 0.875rem;
      color: white;
      text-align: center;
      font-size: 1.5714rem;
      font-weight: 500;
    `
  };
};
