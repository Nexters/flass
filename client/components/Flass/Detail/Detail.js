import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';

import Content from './Content/Content';
import Comment from './Comment/CommentContainer';
import Analysis from './Analysis/Analysis';
import Video from './Video/VideoContainer';
import Header from '../Header';
import { FlassDetailStyled } from './DetailStyled';

import contentImageActive from './images/tab-content-active.png';
import contentImage from './images/tab-content.png';
import commentImageActive from './images/tab-comment-active.png';
import commentImage from './images/tab-comment.png';
import analysisImageActive from './images/tab-analysis-active.png';
import analysisImage from './images/tab-analysis.png';

import color from '../common/colors.scss';
import './Detail.scss';

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
  fetchRequestDetailAll: PropTypes.func.isRequired,
  match: PropTypes.object,
  detail: PropTypes.shape({
    detail: {
      id: PropTypes.number.isRequired,
      userId: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      replayAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    }
  }).isRequired,
  question: PropTypes.shape({
    questions: PropTypes.object
  }).isRequired,
  comment: PropTypes.shape({
    comments: PropTypes.array,
    totalCount: PropTypes.number
  }).isRequired,
  video: PropTypes.shape({
    videoUrl: PropTypes.string
  }).isRequired
};

const defaultProps = {
  match: {
    params: {
      id: -1
    }
  }
};

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      videoUrl: ''
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const detailId = this.props.detail.detail.id;
    if(detailId === -1) {
      this.props.fetchRequestDetailAll(id);
    }
  }

  handleSelect = selected => {
    this.setState({ selected });
  }

  render() {
    const {
      question: { questions },
      video: { videoUrl }
    } = this.props;

    return (
      <FlassDetailStyled.Wrapper>
        <Header title="Watching Video" />
        <FlassDetailStyled.Content>
          <Video
            VideoBarClassName="bar--thinner"
            VideoPlayedBarClassName="played-bar--thinner"
            VideoLoadedBarClassName="loaded-bar--thinner"
            VideoQuizIndicatorClassName="quiz-indicator--thinner"
            VideoQuizIndicatorBarClassName="quiz-indicator-bar--thinner"
            VideoPlayPauseBtnClassName={ classNames('video-btn', 'video-btn--l-margin') }
            VideoVolumeBtnClassName="video-btn"
            VideoVolumeBarClassName={ classNames('video-volume-bar') }

            videoUrl={ videoUrl }
            questions={ questions } />

          <FlassDetailStyled.Tab>
            {this.renderTabs()}
          </FlassDetailStyled.Tab>
        </FlassDetailStyled.Content>
      </FlassDetailStyled.Wrapper>
    );
  }

  renderTabs = () => {
    const { detail: { detail }, comment } = this.props;
    const { selected } = this.state;

    const tabTitle = (title, src) => (
      <TabTitle>
        <TabIcon alt="" src={ src } />
        {title}
      </TabTitle>);
    return (<Tabs id="detail-tabs" activeKey={ selected } onSelect={ this.handleSelect }>
      <Tab
        eventKey={ 1 }
        title={ tabTitle('강의 정보',
          selected === 1 ? contentImageActive : contentImage) }>
        <Content
          title={ detail.title }
          subject={ detail.subject }
          content={ detail.content }
          tetextbookRangextbookRange={ detail['textbook_range'] }
        />
      </Tab>
      <Tab
        eventKey={ 2 }
        title={ tabTitle(`학생 질문 - ${comment.comments.length}`,
          selected === 2 ? commentImageActive : commentImage) }>
        <Comment detailId={ detail.id } />
      </Tab>
      <Tab
        eventKey={ 3 }
        title={ tabTitle('분석',
          selected === 3 ? analysisImageActive : analysisImage) }>
        <Analysis />
      </Tab>
    </Tabs>);
  }
}

Detail.propTypes = propTypes;
Detail.defaultProps = defaultProps;

export default Detail;
