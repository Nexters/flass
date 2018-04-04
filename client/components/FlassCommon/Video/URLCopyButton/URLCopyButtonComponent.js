import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import Copy from 'copy-to-clipboard';
import { IconImg } from './icons';
import {
  Wrapper,
  Icon
} from './URLCopyButtonStyled';

const { string } = PropTypes;

const propTypes = {
  shortenUrl: string.isRequired
};
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
    Copy(this.props.shortenUrl);
    alert('주소가 복사되었습니다.');
  }
}

URLCopyButtonComponent.propTypes = propTypes;
URLCopyButtonComponent.defaultProps = defaultProps;

export { URLCopyButtonComponent };
