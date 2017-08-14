import styled from 'styled-components';

const $playerHeight = 650;
const $playerWidth = 100;
const $progressbarHeight = 80;
const $progressbarHeightThinner = '10px';
const $progressbarHeightThicker = '50px';

const $quizIndicatorBarHeight = '30px';
const $quizIndicatorBarHeightThinner = '10px';
const $quizIndicatorBarHeightThicker = '50px';

const $playerWindowWidthAtLarge = 860;
const $playerWindowWidthAtMedium = '624px';

export const FlassDetailStyled = {
  Wrapper: styled.div``,
  Content: styled.div`
    min-height: 21rem;

    & .flass-detail-media__player-wrapper {
      width: ${$playerWidth}%;
      height: ${$playerHeight}px;
      border-radius: 3px;
    }

    & .flass-detail-media__player {
      &::after {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        content: ""
      }
    }

    & .flass-detail-media__modal {

    }
  `
};
