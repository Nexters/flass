import styled, { keyframes } from 'styled-components';

const GRAY = 'gray';

const $playerHeight = '40.625rem';
const $QuizEditColorBlack = '#3f4a4b';
const $FlassGreenColor = '#9abf32';
const $FlassGrayColor = '#9b9b9b';

const $NormalGreenColor = '#9abf32';
const $WrongRedColor = '#f8490d';

export const VideoModal = {
  Container: styled.div`
    position: absolute;
    top: 0;
    width: ${props => (props.isOpen ? '100%' : 0)};
    padding: 3.4375rem 0;
    height: ${props => (props.isOpen ? $playerHeight : 0)};
    opacity: ${props => (props.isOpen ? 1 : 0)};
    z-index: ${props => (props.isOpen ? 10 : -10)};
    background-color: rgba(0, 0, 0, .5);
    border-radius: 3px;
    transition: opacity .5s ease-out;
  `,
  Inner: styled.div`
    width: 56.33rem;
    height: 100%;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, .9);
    color: black;
    z-index: 20;
    animation: ${showEaseOut} 1s ease-out;
    box-shadow: 3px 4px 20px 0 ${props => selectBorderColor(props)};
    border: solid 1.5px ${props => selectBorderColor(props)};

    transition: border 1s ease-out, box-shadow 1s ease-out;
  `,
  ContentWrapper: styled.div`
    position: relative;
    padding: 3.625rem 3.75rem;
    z-index: 20;
    height: 100%;
  `,
  Header: styled.div`
    width: 100%;
    height: 37px;
    font-family: NotoSansCJKkr;
    text-align: left;
  `,
  QuestionNum: styled.span`
    font-size: 1.7857rem;
    font-weight: 500;
    color: ${$QuizEditColorBlack};
  `,
  QuestionTitle: styled.span`
    margin-left: 1.25rem;
    font-size: 1.4285rem;
    border: none;
    height: 1.875rem;
    color: ${$QuizEditColorBlack};
  `,
  Body: styled.div`
    margin-top: 3.75rem;
  `,
  Footer: styled.div`
    position: absolute;
    bottom: 2.1875rem;
  `,
  Button: styled.div`
    display: table;
    width: 6.875rem;
    height: 3.1875rem;
    border: solid 0.093rem ${props => selectBtnColor(props)};
    border-radius: 6.25rem;
    color: ${props => selectBtnColor(props)};
    float: ${props => (props.right ? 'right' : 'none')};
    cursor: ${props => selectCursor(props)};
    margin-left: ${props => (props.right ? '15px' : '0')};

    transition: color 1s ease-out, border 1s ease-out;
  `,
  Text: styled.span`
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    text-decoration: none;
    font-size: 1.4285rem;
  `
};
function selectColor({ color }) {
  switch(color) {
    case GRAY:
      return $FlassGrayColor;
    default:
      return $FlassGreenColor;
  }
}

function selectBtnColor({ isSolved, selected, isCorrect }) {
  if (!selected) {
    return $FlassGrayColor;
  }

  if (isSolvedAndCorrect({ isSolved, isCorrect })) {
    return $WrongRedColor;
  }

  return $NormalGreenColor;
}

function selectBorderColor({ isSolved, isCorrect }) {
  if (isSolvedAndCorrect({ isSolved, isCorrect })) {
    return $WrongRedColor;
  }

  return $NormalGreenColor;
}

function isSolvedAndCorrect({ isSolved, isCorrect }) {
  return isSolved && !isCorrect;
}

function selectCursor({ selected, pointer }) {
  if (!pointer && !selected) {
    return 'default';
  }

  return 'pointer';
}

const showEaseOut = keyframes`
  0% {
    transform: scale(0.1);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
`;
