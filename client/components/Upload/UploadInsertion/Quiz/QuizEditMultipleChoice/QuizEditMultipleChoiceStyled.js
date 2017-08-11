import styled from 'styled-components';

const GRAY = 'gray';

const $QuizEditColorBlack = '#3f4a4b';
const $FlassGreenColor = '#9abf32';
const $FlassGrayColor = '#9b9b9b';

export const QuizEditMultipleChoice = {
  Wrapper: styled.div`
    padding: 50px 50px;
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
  QuestionTitle: styled.input`
    margin-left: 20px;
    font-size: 20px;
    border: none;
    height: 30px;
    color: ${$QuizEditColorBlack};
    background-color: ${$FlassGrayColor};

    &:disabled {
      background-color: white;
    }
  `,
  Body: styled.div`
    margin-top: 60px;
  `,
  Footer: styled.div`
    margin-top: 35px;
  `,
  Button: styled.div`
    padding: .75rem 1.2rem;
    display: inline-block;
    width: 82px;
    height: 43px;
    border: solid 1.5px ${props => selectColor(props)};
    border-radius: 100px;
    text-align: center;
    text-decoration: none;
    font-size: 2rem;
    color: ${props => selectColor(props)};
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
