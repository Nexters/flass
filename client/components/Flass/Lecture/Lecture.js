import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';

import Content from './Content/Content';
import Comment from './Comment/CommentContainer';
import Analysis from './Analysis/AnalysisContainer';
import Video from './Video/VideoContainer';
import {
  Title,
  Header
} from '../../FlassCommon';
import { FlassLectureStyled } from './LectureStyled';

import {
  contentImageActive,
  contentImage,
  commentImageActive,
  commentImage,
  analysisImageActive,
  analysisImage
} from './icons';

import color from '../../../css/base/colors.scss';
import './Lecture.scss';

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

const { string, func, shape, array, object, bool, number } = PropTypes;

const propTypes = {
  fetchRequestDetailAll: func.isRequired,
  match: object,
  detail: shape({
    isLoading: bool,
    detail: shape({
      id: number,
      userId: number,
      title: string,
      content: string,
      duration: number,
      subject: string,
      textbookRange: string,
      url: string,
      thumbnailUrl: string,
      createdAt: string,
      updatedAt: string
    })
  }).isRequired,
  question: shape({
    questions: shape({
      textStateOfQuestions: array,
      secsStateOfQuestions: array
    })
  }).isRequired,
  comment: shape({
    comments: array,
    totalCount: number
  }).isRequired,
  video: shape({
    videoUrl: string
  }).isRequired,
  lectureId: string
};

const defaultProps = {
  match: {
    params: {
      id: -1
    }
  },
  lectureId: '-1'
};

class Detail extends Component {
  static contextTypes = {
    router: shape({
      history: object.isRequired
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: 3,
      videoUrl: ''
    };
  }

  componentDidMount() {
    if (!this.isDetailAlreadyFetch()) {
      const id = this.selectLectureId();
      this.props.fetchRequestDetailAll(id);
    }
  }

  render() {
    const {
      question: { questions },
      video: { videoUrl }
    } = this.props;

    return (
      <FlassLectureStyled.Wrapper>
        <Header
          Title={ () => <Title title="Watching Video" />}
          SubTitle={ () => null } />

        <FlassLectureStyled.Content>
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

          <FlassLectureStyled.Tab>
            {this.renderTabs()}
          </FlassLectureStyled.Tab>
        </FlassLectureStyled.Content>
      </FlassLectureStyled.Wrapper>
    );
  }

  selectLectureId() {
    const { match: { params: { id } }, lectureId } = this.props;
    return id !== -1 ? id : parseInt(lectureId);
  }

  isDetailAlreadyFetch() {
    return this.props.detail.detail.id !== -1;
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
      {
        this.isAnalysisTabExist() ? (
          <Tab
            eventKey={ 3 }
            title={ tabTitle('분석',
              selected === 3 ? analysisImageActive : analysisImage) }>
            <Analysis />
          </Tab>
        ) : null
      }
    </Tabs>);
  }

  isAnalysisTabExist() {
    return this.context.router.history.location.pathname.split('/')[1] === 'detail';
  }

  handleSelect = selected => {
    this.setState({ selected });
  }
}

Detail.propTypes = propTypes;
Detail.defaultProps = defaultProps;

export default Detail;
