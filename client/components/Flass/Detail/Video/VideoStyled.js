import styled from 'styled-components';

const $playerHeight = 650;
const $playerWidth = 100;
const $progressbarHeight = 80;
const $progressbarHeightThinner = '10px';
const $progressbarHeightThicker = '50px';

const $quizIndicatorBarHeight = '30px';
const $quizIndicatorBarHeightThinner = '10px';
const $quizIndicatorBarHeightThicker = '50px';

const $playerWindowWidthAtLarge = 1155;
const $playerWindowWidthAtMedium = '624px';


export const FlassDetailVideo = {
  Container: styled.div`
    position: relative;
    height: ${$playerHeight}px;
    border-radius: 3px;
  `,
  ControllerBar: styled.div`
    position: absolute;
    width: ${$playerWidth}%;
    height: ${$progressbarHeight}px;
    top: ${$playerHeight - $progressbarHeight - 1}px;
    background-color: rgba(0, 0, 0, .32);

    @media (min-width: 1400px) {
      width: ${$playerWindowWidthAtLarge}px;
      margin: 0 auto;
      left: 0;
      right: 0;
    }
  `,
  EndedPage: styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: ${$playerHeight}px;
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
  border-radius: 3px;
  height: 650px;
`;

export const EndedPageOnDetailPage = props => {
  const { isOpen } = props;

  return {
    Container: `
      position: absolute;
      top: 0;
      width: ${isOpen ? '100%' : 0};
      height: ${isOpen ? 650 : 0}px;
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
