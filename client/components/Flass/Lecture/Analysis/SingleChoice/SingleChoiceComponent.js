import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleChoice } from './SingleChoiceStyled';

const propTypes = {
  answer: PropTypes.string.isRequired,
  userAnswers: PropTypes.array.isRequired,
  isCorrect: PropTypes.bool.isRequired
};

const defaultProps = {};

class SingleChoiceComponent extends Component {
  render() {
    const { isCorrect, answer, userAnswers } = this.props;
    return (
      <SingleChoice.Wrapper>
        <SingleChoice.Header>
          <SingleChoice.Dot isCorrect={ isCorrect } />
          <SingleChoice.Title isCorrect={ isCorrect }>
            { answer }
          </SingleChoice.Title>
        </SingleChoice.Header>
        <SingleChoice.Body>
          {
            userAnswers.map((userAnswer, index) => (
              <SingleChoice.UserView
                key={ `user${index}` }>
                <SingleChoice.TextView>
                  { userAnswer.userName }
                </SingleChoice.TextView>
              </SingleChoice.UserView>
            ))
          }
        </SingleChoice.Body>
      </SingleChoice.Wrapper>
    );
  }
}

SingleChoiceComponent.propTypes = propTypes;
SingleChoiceComponent.defaultProps = defaultProps;

export default SingleChoiceComponent;
