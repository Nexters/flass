import styled from 'styled-components';

const $checkboxBorderColor = '#3f4a4b';
const $NormalGreenColor = '#9abf32';
const $NormalGrayColor = '#a7acad';
const $NormalBlackColor = '#3f4a4b';
const $WrongRedColor = '#f8490d';
const $borderWidth = '0.09375rem';

export const VideoModalSingleChoice = {
  Wrapper: styled.div`
    margin-top: 2.1875rem;
    display: flex;

    & > div {
      display: flex;
      float: none;
    }
  `,
  Checkbox: styled.div`
    width: 1.875rem;
    height: 1.875rem;
    padding: 0.21875rem 0.21875rem;
    border: solid ${$borderWidth} ${$checkboxBorderColor};
    border-radius: 50%;
  `,
  Check: styled.div`
    width: 1.25rem;
    height: 1.25rem;
    border: solid ${$borderWidth} ${props => selectCheckColor(props)};
    border-radius: 50%;
    background-color: ${props => selectCheckColor(props)};
  `,
  QuestionText: styled.div`
    margin-left: 1.25rem;
    font-size: 1.25rem;
    border: none;
    font-weight: ${props => selectFontWeight(props)};
    height: 1.875rem;
    color: ${props => selectTextColor(props)};;
    width: 100%;
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
