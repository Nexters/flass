import styled from 'styled-components';

const $playerHeight = 41.125;
const $borderWidth = '0.1875rem';

const $playerWindowWidthAtLarge = 72.1875;


export const FlassDetailVideo = {
  Container: styled.div`
    position: relative;
    height: ${$playerHeight}rem;
    border-radius: ${$borderWidth};
  `,
  ControllerBar: styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    background-color: transparent;
    opacity: 0;
    transition: opacity 1s ease-out;
    transition-delay: 1s;


    @media (min-width: 57.625rem) {
      width: ${$playerWindowWidthAtLarge}rem;
      margin: 0 auto;
      left: 0;
      right: 0;
    }

    &:hover {
      opacity: 1;
      transition: opacity 1s ease-out;

    }
  `,
  EndedPage: styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: ${$playerHeight}rem;
    background-color: rgba(0, 0, 0, .32);
  `
};

export const ReplayBtn = styled.img`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export const StyledPlayerOnDetailPage = `
  width: 100%;
  border-radius: ${$borderWidth};
  height: 100%;
`;

export const EndedPageOnDetailPage = props => {
  const { isOpen } = props;

  return {
    Container: `
      position: absolute;
      top: 0;
      width: ${isOpen ? '100%' : 0};
      height: ${isOpen ? 100 : 0}%;
      opacity: ${isOpen ? 1 : 0};
      z-index: ${isOpen ? 10 : -10};
      background-color: black;
      border-radius: 0.1875rem;
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
      width: 9.375rem;
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
