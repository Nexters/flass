import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CircularProgress from 'material-ui/CircularProgress';
import { Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';

import Content from './Content/Content';
import Comment from '../../../modules/Flass/FlassDetail/Comment/CommentContainer';
import Analysis from './Analysis/Analysis';
import Video from './Video/Video';
import FlassContentTitleComponent from '../FlassContentTitle/FlassContentTitleComponent';

import contentImageActive from './images/tab-content-active.png';
import contentImage from './images/tab-content.png';
import commentImageActive from './images/tab-comment-active.png';
import commentImage from './images/tab-comment.png';
import analysisImageActive from './images/tab-analysis-active.png';
import analysisImage from './images/tab-analysis.png';


import color from '../common/colors.scss';
import './FlassDetail.scss';

const TabIcon = styled.img`
  width: 15px;
  margin-right: 1rem;
  margin-bottom: 2px;
`;

const TabTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${color['slate-grey']};
`;

const propTypes = {
  match: PropTypes.object,
  detail: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    detail: {
      id: PropTypes.number.isRequired,
      userId: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      replayAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }
  }).isRequired,
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
      selected: 3
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchRequestDetailAll(id);
  }

  handleSelect = selected => {
    this.setState({ selected });
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
        <FlassContentTitleComponent title="Watching Video" />
        <div className="flass-detail-contents">
          <Video
            VideoContainerClassName={ 'flass-detail-media' }
            VideoPlayerWrapperClassName="flass-detail-media__player-wrapper"
            VideoPlayerClassName="flass-detail-media__player"
            VideoControllerBarClassName="flass-detail-media__controller-bar"
            VideoBarClassName="bar--thinner"
            VideoPlayedBarClassName="played-bar--thinner"
            VideoLoadedBarClassName="loaded-bar--thinner"
            VideoQuizIndicatorClassName="quiz-indicator--thinner"
            VideoQuizIndicatorBarClassName="quiz-indicator-bar--thinner"
            VideoPlayPauseBtnClassName={ classNames('video-btn', 'video-btn--l-margin') }
            VideoVolumeBtnClassName="video-btn"
            VideoVolumeBarClassName={ classNames('video-volume-bar') }
            VideoFullscreenBtnClassName={ classNames('video-btn', 'video-btn--right', 'video-btn--r-margin') }
            VideoModalClassName="flass-detail-media__modal"
            VideoModalQuestionClassName="flass-detail-media__modal__question" />

          <div className="flass-detail-tabs">
            {this.renderTabs()}
          </div>
        </div>
      </div>
    );
  }

  renderTabs() {
    const { detail: { detail }, comment } = this.props;
    const { selected } = this.state;

    const tabTitle = (title, src) => (
      <TabTitle>
        <TabIcon alt="" src={ src } />
        {title}
      </TabTitle>);
    return (<div className="flass-detail-tabs">
      <Tabs id="detail-tabs" activeKey={ selected } onSelect={ this.handleSelect }>
        <Tab
          eventKey={ 1 }
          title={ tabTitle('강의 정보',
          selected === 1 ? contentImageActive : contentImage) }>
          <Content content={detail.content} />
        </Tab>
        <Tab
          eventKey={ 2 }
          title={ tabTitle(`학생 질문 - ${comment.totalCount}`,
          selected === 2 ? commentImageActive : commentImage) }>
          <Comment detailId={detail.id} />
        </Tab>
        <Tab
          eventKey={ 3 }
          title={ tabTitle('분석',
          selected === 3 ? analysisImageActive : analysisImage) }>
          <Analysis />
        </Tab>
      </Tabs>
    </div>);
  }
}

FlassDetail.propTypes = propTypes;
FlassDetail.defaultProps = defaultProps;

export default FlassDetail;
