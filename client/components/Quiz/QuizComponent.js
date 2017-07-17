import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../modules/Quiz/quiz';

const { func, bool } = PropTypes;

const propTypes = {
  addQuiz: func.isRequired,
  resetQuizState: func.isRequired,
  isAddQuizSuccess: bool
};
const defaultProps = {
  isAddQuizSuccess: false
};

class QuizComponent extends Component {
  render() {
    return (
      <div>
        <button
          onClick={ this.onAddQuizClick }>
          퀴즈 추가하기
        </button>
        <div>{`퀴즈 추가 성공 여부: ${this.props.isAddQuizSuccess}`}</div>
      </div>
    );
  }

  @autobind
  onAddQuizClick() {
    this.props.addQuiz();
    setTimeout(() => {
      this.props.resetQuizState();
    }, 1000);
  }
}


QuizComponent.propTypes = propTypes;
QuizComponent.defaultProps = defaultProps;

function mapStateToProps(state) {
  const { quiz: { isAddQuizSuccess } } = state;

  return {
    isAddQuizSuccess
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizComponent);
