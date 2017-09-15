import styled from 'styled-components';

const $checkboxBorderColor = '#3f4a4b';
const $NormalGreenColor = '#9abf32';
const $NormalGrayColor = '#a7acad';
const $WrongRedColor = '#f8490d';

export const CompletedSingleChoice = {
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
    border: solid 1.5px ${$checkboxBorderColor};
    border-radius: 50%;
  `,
  Check: styled.div`
    width: 1.875rem;
    height: 1.25rem;
    border: solid 0.09375rem ${props => selectCheckColor(props)};
    border-radius: 50%;
    background-color: ${props => selectCheckColor(props)};
  `,
  QuestionText: styled.div`
    margin-left: 1.25rem;
    font-size: 1.4285rem;
    border: none;
    font-weight: ${props => selectFontWeight(props)};
    height: 1.875rem;
    color: ${props => selectTextColor(props)};;
    width: 15.625rem;
  `
};

function selectTextColor({ isCorrect, isChecked }) {
  if (!isChecked) {
    return $NormalGrayColor;
  }

  if (!isCorrect) {
    return $WrongRedColor;
  }

  return $NormalGreenColor;
}

function selectCheckColor({ isCorrect }) {
  if (!isCorrect) {
    return $WrongRedColor;
  }

  return $NormalGreenColor;
}

function selectFontWeight({ isChecked }) {
  return isChecked ? 'bold' : 'normal';
}
