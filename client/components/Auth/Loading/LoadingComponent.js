import React, { Component } from 'react';
import {
  Wrapper,
  LoadingIcon,
  LoadingText
} from './LoadingStyled';
import FlassIcon from './icons/logo@2x.png';

class LoadingComponent extends Component {
  render() {
    return (
      <Wrapper>
        <LoadingIcon srcSet={ FlassIcon } />
        <LoadingText>
          잠시만 기다려주세요.
        </LoadingText>
      </Wrapper>
    );
  }
}

export default LoadingComponent;
