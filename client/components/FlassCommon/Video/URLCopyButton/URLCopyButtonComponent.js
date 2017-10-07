import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import {
  IconImg
} from './icons';
import {
  Wrapper,
  Icon
} from './URLCopyButtonStyled';

const propTypes = {};
const defaultProps = {};

class URLCopyButtonComponent extends Component {
  render() {
    return (
      <Wrapper>
        <Icon
          srcSet={ IconImg }
          onClick={ this.onButtonClick } />
      </Wrapper>
    );
  }

  @autobind
  onButtonClick() {
    console.log('button clicked!');
  }
}

URLCopyButtonComponent.propTypes = propTypes;
URLCopyButtonComponent.defaultProps = defaultProps;

export { URLCopyButtonComponent };
