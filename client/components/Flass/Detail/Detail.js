import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CircularProgress from 'material-ui/CircularProgress';
import { Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';

import Content from './Content/Content';
import Comment from './Comment/CommentContainer';
import Analysis from './Analysis/Analysis';
import Video from './Video/VideoContainer';
import ContentTitleComponent from '../ContentTitle/ContentTitleComponent';
import { FlassDetailStyled } from './DetailStyled';

import contentImageActive from './images/tab-content-active.png';
import contentImage from './images/tab-content.png';
import commentImageActive from './images/tab-comment-active.png';
import commentImage from './images/tab-comment.png';
import analysisImageActive from './images/tab-analysis-active.png';
import analysisImage from './images/tab-analysis.png';

import color from '../common/colors.scss';
import './Detail.scss';

const { string, number, shape, object, array, bool, func } = PropTypes;

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
  fetchRequestDetailAll: func.isRequired,
  match: object,
  detail: shape({
    detail: {
      id: number.isRequired,
      userId: string.isRequired,
      userName: string.isRequired,
      title: string.isRequired,
      content: string.isRequired,
      url: string.isRequired,
      replayAt: string.isRequired,
      createdAt: string.isRequired
    }
  }).isRequired,
  question: shape({
    questions: object
  }).isRequired,
  comment: shape({
    comments: array,
    totalCount: number
  }).isRequired,
  video: shape({
    videoUrl: string
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
      selected: 2,
      videoUrl: ''
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
    const {
      question: { questions },
      video: { videoUrl }
    } = this.props;

    return (
      <FlassDetailStyled.Wrapper>
        <ContentTitleComponent title="Watching Video" />
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

  renderTabs() {
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
        <Content content={ detail.content } />
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
