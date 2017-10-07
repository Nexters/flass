import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SingleChoice } from './SingleChoiceStyled';
import colors from '../../../../../css/base/colors.scss';

const UserView = styled.span`
  padding: 0.3rem;
  margin-right: 0.8rem;
  border-radius: 3px;
  border: solid 1.5px ${colors['cool-grey-two']};
`;

const propTypes = {
  answer: PropTypes.string.isRequired,
  userAnswers: PropTypes.array.isRequired,
  isCorrect: PropTypes.bool.isRequired,
};

const defaultProps = {};

class SingleChoiceComponent extends Component {
  render() {
    const { isCorrect, answer, userAnswers } = this.props;
    return (
      <SingleChoice.Wrapper>
        <SingleChoice.Header>
          <SingleChoice.Dot isCorrect={ isCorrect }>{''}</SingleChoice.Dot>
          <SingleChoice.Title isCorrect={ isCorrect }>
            { answer }
          </SingleChoice.Title>
        </SingleChoice.Header>
        <SingleChoice.Body>
          {
            userAnswers.map((userAnswer, index) => (
              <UserView
                key={ `user${index}` }>
                { userAnswer.userName }
              </UserView>
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
