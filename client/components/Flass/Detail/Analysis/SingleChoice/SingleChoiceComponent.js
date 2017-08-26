import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleChoice } from './SingleChoiceStyled';

const propTypes = {};

const defaultProps = {};

class SingleChoiceComponent extends Component {
  render() {
    return (
      <SingleChoice.Wrapper>
        <SingleChoice.Header>
          <SingleChoice.Dot>{''}</SingleChoice.Dot>
          <SingleChoice.Title>
            선택지
          </SingleChoice.Title>
        </SingleChoice.Header>
        <SingleChoice.Body>
          
        </SingleChoice.Body>
      </SingleChoice.Wrapper>
    );
  }
}

SingleChoiceComponent.propTypes = propTypes;
SingleChoiceComponent.defaultProps = defaultProps;

export default SingleChoiceComponent;
