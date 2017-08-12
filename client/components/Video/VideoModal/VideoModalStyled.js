import styled, { keyframes } from 'styled-components';

const GRAY = 'gray';

const $playerHeight = '650px';
const $QuizEditColorBlack = '#3f4a4b';
const $FlassGreenColor = '#9abf32';
const $FlassGrayColor = '#9b9b9b';

const $NormalGreenColor = '#9abf32';
const $WrongRedColor = '#f8490d';

export const VideoModal = {
  Container: styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    padding: 50px 0;
    height: ${$playerHeight};
    z-index: 10;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 3px;
  `,
  Inner: styled.div`
    width: 900px;
    height: 100%;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, .9);
    color: black;
    z-index: 20;
    animation: ${showEaseOut} 1s ease-out;
    box-shadow: 3px 4px 20px 0 ${props => isSolvedAndCorrect(props)};
    border: solid 1.5px ${props => isSolvedAndCorrect(props)};
  `,
  ContentWrapper: styled.div`
    position: relative;
    padding: 58px 60px;
    height: 100%;
  `,
  Header: styled.div`
    width: 100%;
    height: 37px;
    font-family: NotoSansCJKkr;
    text-align: left;
  `,
  QuestionNum: styled.span`
    font-size: 25px;
    font-weight: 500;
    color: ${$QuizEditColorBlack};
  `,
  QuestionTitle: styled.span`
    margin-left: 20px;
    font-size: 20px;
    border: none;
    height: 30px;
    color: ${$QuizEditColorBlack};
  `,
  Body: styled.div`
    margin-top: 60px;
  `,
  Footer: styled.div`
    position: absolute;
    bottom: 35px;
    right: 47px;
  `,
  Button: styled.div`
    padding: 1rem 1.2rem;
    display: inline-block;
    width: 110px;
    height: 51px;
    border: solid 1.5px ${props => isSolvedAndCorrect(props)};
    border-radius: 100px;
    text-align: center;
    text-decoration: none;
    font-size: 2rem;
    color: ${props => isSolvedAndCorrect(props)};
    cursor: pointer;

    float: ${props => (props.right ? 'right' : 'none')};
    margin-left: ${props => (props.right ? '15px' : '0')};
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

function isSolvedAndCorrect({ isSolved, isCorrect }) {
  if (isSolved && !isCorrect) {
    return $WrongRedColor;
  }

  return $NormalGreenColor;
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
