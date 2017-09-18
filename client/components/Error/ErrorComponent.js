import React, { Component } from 'react';
import {
  Wrapper,
  Icon,
  ErrorResponseCode,
  ErrorText
} from './ErrorStyled';
import ErrorIcon from './icons/error-icon@3x.png';

class ErrorComponent extends Component {
  render() {
    return (
      <Wrapper>
        <Icon srcSet={ ErrorIcon } />
        <ErrorResponseCode>
          Error 400
        </ErrorResponseCode>
        <ErrorText>
          이 웹페이지를 찾는 도중 문제가 발생하였습니다.
        </ErrorText>
      </Wrapper>
    );
  }
}

export default ErrorComponent;
