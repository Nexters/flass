import styled from 'styled-components';

const $checkboxBorderColor = '#3f4a4b';
const $checkColor = '#9abf32';
const $qtextBorderColor = '#3f4a4b';
const $FlassGrayColor = '#9b9b9b';

export const QuizEditSingleChoice = {
  Wrapper: styled.div`
    margin-top: 35px;
    display: flex;

    & > div {
      display: flex;
      float: none;
    }
  `,
  Checkbox: styled.div`
    width: 30px;
    height: 30px;
    padding: 3.5px 3.5px;
    border: solid 1.5px ${$checkboxBorderColor};
    border-radius: 50%;
  `,
  Check: styled.div`
    width: 20px;
    height: 20px;
    border: solid 1.5px ${$checkColor};
    border-radius: 50%;
    background-color: ${$checkColor};
  `,
  QuestionText: styled.input`
  margin-left: 20px;
  font-size: 20px;
  border: none;
  height: 30px;
  color: ${$qtextBorderColor};
  width: 250px;
  background-color: ${$FlassGrayColor};

  &:disabled {
    background-color: white;
  }
  `
};
