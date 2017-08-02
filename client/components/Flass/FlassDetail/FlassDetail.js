import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import { Tab, Tabs } from 'react-bootstrap';
import Comment from './Comment/Comment';
import Analysis from './Analysis/Analysis';
import Video from './Video/Video';

import './FlassDetail.scss';

const propTypes = {
  match: PropTypes.object,
  detail: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  comment: PropTypes.shape({
    comments: PropTypes.array,
    totalCount: PropTypes.number
  }).isRequired,
  fetchRequestDetailAll: PropTypes.func.isRequired
};

const defaultProps = {
  match: {
    params: {
      id: -1
    }
  }
};

class FlassDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 1,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchRequestDetailAll(id);
  }

  handleSelect = key => {
    this.setState({ key });
  }

  render() {
    const { detail, question } = this.props;

    if (detail.isLoading) {
      return (
        <div style={ { textAlign: 'center' } }>
          <CircularProgress size={ 80 } thickness={ 5 } />
        </div>
      );
    }
    return (
      <div className="flass-detail">
        <h2>{detail.title}</h2>
        <div className="flass-detail-contents">
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
          </div>
        </div>
        <div className="flass-detail-tabs">
          {this.renderTabs()}
        </div>
      </div>
    );
  }

  renderTabs() {
    const { comment } = this.props;

    const tabTitle = (title, src) => <span><img alt="" src={ src } /> {title}</span>;
    const src = 'http://via.placeholder.com/25x25';
    return (<div className="flass-detail-tabs">
      <Tabs activeKey={ this.state.key } onSelect={ this.handleSelect }>
        <Tab eventKey={ 1 } title={ tabTitle('강의 정보', src) }>
          <Comment comments={ comment.comments } />
        </Tab>
        <Tab eventKey={ 2 } title={ tabTitle(`학생 질문 - ${comment.totalCount}`, src) }>
          <Comment comments={ comment.comments } />
        </Tab>
        <Tab eventKey={ 3 } title={ tabTitle('분석', src) }>
          <Analysis />
        </Tab>
      </Tabs>
    </div>);
  }
}

FlassDetail.propTypes = propTypes;
FlassDetail.defaultProps = defaultProps;

export default FlassDetail;
