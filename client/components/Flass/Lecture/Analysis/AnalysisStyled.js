import styled from 'styled-components';

import media from '~/css/styled/base/media';

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

export { AnalysisStyled };
