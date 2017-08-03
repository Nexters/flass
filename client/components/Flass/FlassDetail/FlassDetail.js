import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CircularProgress from 'material-ui/CircularProgress';
import { Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';

import Content from './Content/Content';
import Comment from './Comment/Comment';
import Analysis from './Analysis/Analysis';
import Video from './Video/Video';
import FlassContentTitleComponent from '../FlassContentTitle/FlassContentTitleComponent';

import color from '../common/colors.scss';
import './FlassDetail.scss';

const TabIcon = styled.div`
  width: 20.1px;
  height: 20.1px;
  border: solid 2px #176d99;
  border: solid 2px var(--light-navy);
`;

const TabTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${color['slate-grey']};
`;

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
      key: 2
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
        <FlassContentTitleComponent title="Watching Video" />
        <div className="flass-detail-contents">
          <Video
            VideoContainerClassName={ 'flass-detail-media' }
            VideoPlayerClassName="flass-detail-media__player"
            VideoControllerBarClassName="flass-detail-media__controller-bar"
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
    const { comment } = this.props;

    const tabTitle = (title, src) => <TabTitle>{title}</TabTitle>;
    const src = 'http://via.placeholder.com/25x25';
    return (<div className="flass-detail-tabs">
      <Tabs activeKey={ this.state.key } onSelect={ this.handleSelect }>
        <Tab eventKey={ 1 } title={ tabTitle('강의 정보', src) }>
          <Content />
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
