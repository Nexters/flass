import styled from 'styled-components';

const $FlassGreenColor = '#9abf32';
const $FlassGrayColor = '#9b9b9b';


export const QuizMultipleChoice = {
  Wrapper: styled.div`
    padding: 3.125rem 3.125rem;
  `,
  Header: styled.div`
    width: 100%;
    height: 2.3125rem;
    text-align: left;
  `,
  QuestionNumber: styled.span`
    font-size: 1.7857rem;
    font-weight: 500;
    color: #3f4a4b;
  `,
  QuestionTitleWrapper: styled.span`
    position: relative;
    display: inline-block;
    padding: 0 1.875rem 0 0;
    width: 31.25rem;
  `,
  underline: styled.span`
    position: absolute;
    width: 0;
    bottom: 0;
    left: 0;
    margin-left: 1.25rem;
    border: .5px solid #d3d9d9;
    transition: all 0.3s linear;
    opacity: 0;
  `,
  QuestionTitle: styled.input`
    margin-left: 1.25rem;
    font-size: 1.4285rem;
    border: none;
    border-bottom: solid .5px white;
    height: 1.875rem;
    width: 100%;
    outline: none;
    color: ${props => selectInputTitleColor(props)};

    &:focus ~ span {
      width: 80%;
      opacity: 1;
    }
  `,
  Icon: styled.img`
    width: 1.875rem;
    height: 1.875rem;
    cursor: pointer;
  `,
  Button: styled.div`
    display: table-cell;
    vertical-align: middle;
    width: 5.125rem;
    height: 2.6875rem;
    border: solid 1.5px ${props => selectBorderColor(props)};
    border-radius: 6.25rem;
    text-align: center;
    text-decoration: none;
    font-size: 1.4285rem;
    color: ${props => selectFontColor(props)};
    cursor: pointer;

    float: ${props => (props.right ? 'right' : 'none')};
    margin-left: ${props => (props.right ? '15px' : '0')};
  `,
  AddButton: styled.div`
    margin-top: 1.875rem;
    display: flex;

    & > div {
      display: flex;
      float: none;
    }
  `,
  AddButtonText: styled.div`
    margin-left: 1.25rem;
    font-size: 1.4285rem;
    border: none;
    height: 1.875rem;
    color: #edeeee;
    flex: 1;
  `,
  Body: styled.div`
    margin-top: 3.75rem;
  `,
  Footer: styled.div`
    margin-top: 2.1875rem;
    display: table;
    float: right;
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
