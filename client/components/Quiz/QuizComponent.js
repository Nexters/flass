import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VideoDurationComponent from '../Video/VideoDurationComponent';
import './QuizStyle.scss';
import * as actions from '../../modules/Quiz/quiz';

const { func, bool, string, array } = PropTypes;

const propTypes = {
  addQuiz: func.isRequired,
  resetQuizState: func.isRequired,
  isAddQuizSuccess: bool,
  playedSeconds: string,
  quizTimeArray: array
};
const defaultProps = {
  isAddQuizSuccess: false,
  playedSeconds: '',
  quizTimeArray: []
};

class QuizComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddingQuizWindowOpen: false
    };
  }
  render() {
    const { isAddQuizSuccess } = this.props;

    return (
      <div className="quiz">
        <div
          className="quiz__button"
          onClick={ this.onAddQuizClick }>
          퀴즈 추가하기 버튼
        </div>
        <div>{`퀴즈 추가 성공 여부: ${isAddQuizSuccess}`}</div>
        <div>
          { this.renderQuizWindow() }
        </div>
        <div>{ this.renderQuizTimeArray() }</div>
      </div>
    );
  }

  @autobind
  onAddQuizClick() {
    this.setState({ isAddingQuizWindowOpen: true });
    this.props.addQuiz({ playedSeconds: this.props.playedSeconds });
    setTimeout(() => {
      this.setState({ isAddingQuizWindowOpen: false });
      this.props.resetQuizState();
    }, 1000);
  }

  renderQuizTimeArray() {
    return this.props.quizTimeArray.map(quizTime => (
      <div key={ quizTime }>
        <VideoDurationComponent seconds={ parseFloat(quizTime) } />
      </div>
    ));
  }

  renderQuizWindow() {
    if (this.state.isAddingQuizWindowOpen) {
      return (
        <div>
          AddingQuizWindow
        </div>
      );
    }
  }
}


QuizComponent.propTypes = propTypes;
QuizComponent.defaultProps = defaultProps;

function mapStateToProps(state) {
  const { quiz: { isAddQuizSuccess, quizTimeArray } } = state;
  return {
    isAddQuizSuccess,
    quizTimeArray
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizComponent);
