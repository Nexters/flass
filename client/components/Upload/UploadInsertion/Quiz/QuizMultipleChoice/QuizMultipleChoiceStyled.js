import styled from 'styled-components';

const $FlassGreenColor = '#9abf32';
const $FlassGrayColor = '#9b9b9b';


export const QuizMultipleChoice = {
  Wrapper: styled.div`
    padding: 50px 50px;
  `,
  Header: styled.div`
    width: 100%;
    height: 37px;
    text-align: left;
  `,
  QuestionNumber: styled.span`
    font-size: 25px;
    font-weight: 500;
    color: #3f4a4b;
  `,
  QuestionTitle: styled.input`
    margin-left: 20px;
    font-size: 20px;
    border: none;
    border-bottom: solid 1px white;
    height: 30px;
    width: 80%;
    outline: none;
    color: ${props => selectInputTitleColor(props)};

    span {
      position: absolute;
      left: 0;
      content: '';
      height: 40px;
      height: 5px;
      background: #f00;
      transition: all 0.5s linear;
      width: 0;
      bottom: -5px;
    }

    &:hover ~ span {
      width: 200px;
    }
  `,
  Icon: styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
  `,
  Button: styled.div`
    padding: .75rem 1.2rem;
    display: inline-block;
    width: 82px;
    height: 43px;
    border: solid 1.5px ${props => selectBorderColor(props)};
    border-radius: 100px;
    text-align: center;
    text-decoration: none;
    font-size: 2rem;
    color: ${props => selectFontColor(props)};
    cursor: pointer;

    float: ${props => (props.right ? 'right' : 'none')};
    margin-left: ${props => (props.right ? '15px' : '0')};
  `,
  AddButton: styled.div`
    margin-top: 30px;
    display: flex;

    & > div {
      display: flex;
      float: none;
    }
  `,
  AddButtonText: styled.div`
    margin-left: 20px;
    font-size: 20px;
    border: none;
    height: 30px;
    color: #edeeee;
    width: 250px;
  `,
  Body: styled.div`
    margin-top: 60px;
  `,
  Footer: styled.div`
    margin-top: 35px;
  `
};

function selectInputTitleColor({ isTitleInputDirty }) {
  return isTitleInputDirty ? '#3f4a4b' : '#cacdcd';
}

function selectBorderColor({ gray }) {
  return gray ? $FlassGrayColor : $FlassGreenColor;
}

function selectFontColor({ gray }) {
  return gray ? $FlassGrayColor : $FlassGreenColor;
}
