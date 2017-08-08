import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import * as actions from '../../../../modules/Upload/UploadInsertion/Quiz/QuizActions';


import QuizWrapperComponent from './QuizWrapper/QuizWrapperComponent';
import QuizIndexComponent from './QuizIndex/QuizIndexComponent';
import QuizMultipleChoiceComponent from './QuizMultipleChoice/QuizMultipleChoiceComponent';

import './QuizComponentStyles.scss';

const { bool, func } = PropTypes;

const propTypes = {
  addMultipleChoiceQuestion: func.isRequired,
  isAdding: bool
};
const defaultProps = {
  isAdding: false
};

class QuizComponent extends Component {
  render() {
    return (
      <QuizWrapperComponent>
        <div className="quiz">
          { this.renderQuizComponent() }
        </div>
      </QuizWrapperComponent>
    );
  }

  @autobind
  renderQuizComponent() {
    const { isAdding } = this.props;

    if (!isAdding) {
      return (
        <QuizIndexComponent
          onAddMultipleChoiceQuizBtnClick={ this.onAddMultipleChoiceQuizBtnClick } />
      );
    } else {
      return (
        <QuizMultipleChoiceComponent />
      );
    }
  }

  @autobind
  onAddMultipleChoiceQuizBtnClick() {
    this.props.addMultipleChoiceQuestion();
  }
}

QuizComponent.propTypes = propTypes;
QuizComponent.defaultProps = defaultProps;

function mapStateToProps({ quizInsertion }) {
  const { isAdding, type } = quizInsertion;

  return {
    isAdding,
    type
  };
}

export default connect(mapStateToProps, actions)(QuizComponent);
