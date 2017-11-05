import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './QuizIndexComponentStyles.scss';
import QuizIndexAddIcon from './icons/info_btn01.png';

const { func } = PropTypes;

const propTypes = {
  onAddMultipleChoiceQuizBtnClick: func.isRequired
};
const defaultProps = {};

class QuizIndexComponent extends Component {
  render() {
    const { onAddMultipleChoiceQuizBtnClick } = this.props;

    return (
      <div className="quiz-index">
        <div className="quiz-index__content">
          <img
            className="quiz-index__icon"
            srcSet={ QuizIndexAddIcon }
            alt="퀴즈 아이콘" />

          <div className="quiz-index__text">
            퀴즈를 추가하세요.
          </div>
          <div className="quiz-index__container">
            <div
              className="quiz-index__btn"
              onClick={ onAddMultipleChoiceQuizBtnClick }>
              <span>
                객관식
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

QuizIndexComponent.propTypes = propTypes;
QuizIndexComponent.defaultProps = defaultProps;

export default QuizIndexComponent;
