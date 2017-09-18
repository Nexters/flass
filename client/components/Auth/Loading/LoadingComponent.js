import React, { Component } from 'react';
import {
  Wrapper,
  Icon
} from './LoadingStyled';
import FlassIcon from './icons/logo@3x.png';

class LoadingComponent extends Component {
  render() {
    return (
      <Wrapper>
        <Icon srcSet={ FlassIcon } />
      </Wrapper>
    );
  }
}

export default LoadingComponent;
