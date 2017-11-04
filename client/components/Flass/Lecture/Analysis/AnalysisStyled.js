import styled from 'styled-components';
import media from '../../../../css/styled/base/media';

const tooltipWidth = 3.4375;
const tooltipHeight = 3.125;

const AnalysisStyled = {
  Wrapper: styled.div`
    padding: 0 4.75rem 7.6875rem 4.75rem;
  `,
  Header: styled.div`
    padding-top: 2.9375rem;
    overflow: hidden;
  `,
  Body: styled.div`
    padding-top: 3.375rem;
    overflow: hidden;
  `,
  Row: styled.div`
    ${media.atLarge`
      display: flex;

      & > div {
        float: none;
        display: flex;
      }
    `}
    margin-top: ${props => (props.marginTop ? 4 : 0)}rem;

    &::after {
      content: "";
      clear: both;
      display: table;
    }
  `,
  Col5: styled.div`
    position: relative;
    float: left;
    width: 50%;
  `,
  Tab: styled.ul`
    padding: 0;
    list-style: none;
  `,
  TabWrapper: styled.li`
    float: left;
  `,
  TabItem: styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.8125rem;
    position: relative;
    width: ${tooltipWidth}rem;
    height: ${tooltipHeight}rem;
    background-color: #edeeee;
    text-align: center;
    font-size: 1.5714rem;
    font-weight: 'bold';
    border: solid 1.5px #cacdcd;
    border-radius: 3px;
    color: #cacdcd;
    transition: all .5s ease-out;

    &:hover {
      background-color: #87ac1e;
      color: white;
      border: solid 1px #92b729;
    }
  `,
  ActiveTabItemStyle: {
    backgroundColor: '#87ac1e',
    border: '1px #87ac1e solid',
    color: 'white'
  },
  ChartWrapper: styled.div`
    position: relative;
    padding: 0 2.625rem;
  `,
  Title: styled.div`
    font-size: 1.62rem;
    font-weight: bold;
    color: #3f4a4b;
    text-align: left;
  `,
  ChartTextWrapper: styled.div`
    z-index: 5;
    position: absolute;
    width: 12rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  ChartTextTitle: styled.div`
    margin: 0 auto;
    font-size: 1.4285rem;
    font-weight: 500;
    text-align: center;
    color: #848b8c;
  `,
  ChartTextNumber: styled.div`
    margin: 0.625rem auto 0 auto;
    font-size: 3.8571rem;
    font-weight: 900;
    text-align: center;
    color: #176d99;
  `
};

const NoQuestions = {
  Wrapper: styled.div`
    display: flex;
    margin-top: 3rem;
    flex-direction: column;
    justify-content: center;
  `,
  Text: styled.div`
    margin-bottom: 3rem;
    font-size: 1.5625rem;
    font-weight: 500;
    color: #b6bfc1;
    text-align: center;
  `
};

export {
  AnalysisStyled,
  NoQuestions
};
