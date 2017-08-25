import styled from 'styled-components';
import media from '../../../styled-components/base/media';

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
  Tooltip: styled.div`
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

    &:first-child {
      margin-left: 1.3125rem;
    }

    &:hover {
      background-color: #87ac1e;
      color: white;
      border: solid 1px #92b729;
    }
  `,
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

export {
  AnalysisStyled
};
