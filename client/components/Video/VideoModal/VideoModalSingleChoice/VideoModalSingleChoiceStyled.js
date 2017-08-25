import styled from 'styled-components';

const $checkboxBorderColor = '#3f4a4b';
const $NormalGreenColor = '#9abf32';
const $NormalGrayColor = '#a7acad';
const $NormalBlackColor = '#3f4a4b';
const $WrongRedColor = '#f8490d';

export const VideoModalSingleChoice = {
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
    border: solid 1.5px ${props => selectCheckColor(props)};
    border-radius: 50%;
    background-color: ${props => selectCheckColor(props)};
  `,
  QuestionText: styled.div`
    margin-left: 20px;
    font-size: 20px;
    border: none;
    font-weight: ${props => selectFontWeight(props)};
    height: 30px;
    color: ${props => selectTextColor(props)};;
    width: 250px;
  `
};

function selectTextColor({ isSolved, isCorrect, isChecked }) {
  if (!isSolved) {
    return $NormalBlackColor;
  }

  if (!isChecked) {
    return $NormalGrayColor;
  }

  if (isSolved && !isCorrect) {
    return $WrongRedColor;
  }

  return $NormalGreenColor;
}

function selectCheckColor({ isSolved, isCorrect }) {
  if (!isSolved) {
    return $NormalGreenColor;
  }

  if (!isCorrect) {
    return $WrongRedColor;
  }

  return $NormalGreenColor;
}

function selectFontWeight({ isSolved, isChecked }) {
  if (isSolved && isChecked) {
    return 'bold';
  }

  return 'normal';
}
