import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import { Tabs, Tab } from 'material-ui/Tabs';
import Comment from './Comment/Comment';
import Analysis from './Analysis/Analysis';

import Video from './Video/Video';

import Question from './Question/Question';

import './FlassDetail.scss';

const propTypes = {
  match: PropTypes.object,
  detail: PropTypes.object.isRequired,
  comment: PropTypes.shape({
    comments: PropTypes.array,
    totalCount: PropTypes.number
  }).isRequired,
  fetchRequestDetail: PropTypes.func.isRequired,
  fetchRequestQuestion: PropTypes.func.isRequired,
  fetchRequestComment: PropTypes.func.isRequired,
};

const defaultProps = {
  match: {
    params: {
      id: -1
    }
  }
};

class FlassDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchRequestDetail(id);
    this.props.fetchRequestQuestion(id);
    this.props.fetchRequestComment(id);
  }

  handleChange = value => {
    switch(value) {
      case 'question' :
        break;
      case 'anaylsis' :
        break;
    }
  };

  render() {
    const { detail, question } = this.props;

    return (
      <div className="flass-detail">
        <div className="flass-detail-contents">
          <Subheader>{detail.title}</Subheader>
          <div>
            <Video
              VideoContainerClassName={ [
                'flass-detail-media',
                'flass-detail-media--larger-height'
              ] }
              VideoPlayerClassName="flass-detail-media__player"
              VideoControllerBarClassName="flass-detail-media__controller-bar"
              VideoPlayedBarClassName="played-bar--thinner"
              VideoLoadedBarClassName="loaded-bar--thinner"
              VideoQuizIndicatorClassName="quiz-indicator--thinner"
              VideoQuizIndicatorBarClassName="quiz-indicator-bar--thinner"
              VideoPlayPauseBtnClassName="video-btn"
              VideoFullscreenBtnClassName={ ['video-btn', 'video-btn--right'] }
              VideoModalClassName="flass-detail-media__modal"
              VideoModalQuestionClassName="flass-detail-media__modal__question" />

            <Question
              questions={question.questions}
              QuestionListClassName="flass-detail-question-list" />
          </div>
          <p>
            {detail.content}
          </p>
        </div>
        {this.renderTabs()}
      </div>
    );
  }

  renderTabs() {
    const { comment } = this.props;

    return (<div className="flass-detail-tabs">
      <Tabs
        onChange={ this.handleChange }>
        <Tab label={ `질문 ${comment.totalCount}` } value="question">
          <Comment comments={ comment.comments } />
        </Tab>
        <Tab label="분석" value="anaylsis">
          <Analysis />
        </Tab>
      </Tabs>
    </div>);
  }
}

FlassDetail.propTypes = propTypes;
FlassDetail.defaultProps = defaultProps;

export default FlassDetail;
