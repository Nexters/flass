import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';
import Content from './Content/Content';
import Comment from './Comment/Comment';
import Analysis from './Analysis/Analysis';
import Video from './Video/Video';
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
import {
  FETCH_LECTURE,
  unmountLecture
} from '../../../ducks/Flass/lectures';
import { REQUEST_ON_ENDED } from '../../../ducks/Flass/videos';
import withLoading from './withLoading';


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

const { string, func, shape, array, object, bool, number, oneOfType } = PropTypes;

const propTypes = {
  fetchRequestLectureAll: func.isRequired,
  saveQuestionsStateOnEnded: func.isRequired,
  unmountLecture: func.isRequired,
  match: shape({
    params: shape({
      id: oneOfType([number, string])
    })
  }).isRequired,
  user: shape({
    id: number,
  }).isRequired,
  lecture: shape({
    isLoading: bool,
    lecture: shape({
      userId: number,
      title: string,
      content: string,
      duration: number,
      subject: string,
      textbookRange: string,
      url: string,
      thumbnailUrl: string,
      shortenUrl: string,
      createdAt: string,
      updatedAt: string
    }),
    isError: bool.isRequired
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
  lectureIdFromLink: oneOfType([string, number]),
  lectureIdFromReducer: number,
  isFetched: bool
};

const defaultProps = {
  match: {
    params: {
      id: -1
    }
  },
  lectureIdFromLink: '-1',
  lectureIdFromReducer: -1,
  isFetched: false
};

class Lecture extends Component {
  static contextTypes = {
    router: shape({
      history: object.isRequired
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      videoUrl: ''
    };
  }

  componentWillMount() {
    if (this._isLectureOwner()) {
      this.setState({ selected: 3 });
    }
  }

  componentDidMount() {
    if (!this._isLectureAlreadyFetch()) {
      const id = this.selectLectureId();
      this.props.fetchRequestLectureAll(id);
    }
  }

  componentWillUnmount() {
    this.props.unmountLecture();
  }

  render() {
    const {
      question: { questions },
      video: { videoUrl },
      lecture: {
        isError,
        lecture: {
          shortenUrl
        }
      }
    } = this.props;

    return isError ?
      <Redirect to="/error" /> :

      <FlassLectureStyled.Wrapper>
        <Header
          Title={ () => <Title title="Watching Video" />}
          SubTitle={ () => null } />

        <FlassLectureStyled.Content>
          <Video
            VideoPlayPauseBtnClassName={ classNames('video-btn', 'video-btn--l-margin') }
            VideoVolumeBtnClassName="video-btn"
            VideoVolumeBarClassName={ classNames('video-volume-bar') }

            saveQuestionsStateOnEnded={ this.saveQuestionsStateOnEnded }
            videoUrl={ videoUrl }
            shortenUrl={ shortenUrl }
            questions={ questions } />

          <FlassLectureStyled.Tab>
            { this.renderTabs() }
          </FlassLectureStyled.Tab>
        </FlassLectureStyled.Content>
      </FlassLectureStyled.Wrapper>;
  }

  _isLectureOwner() {
    const { user, lecture: { lecture: { userId } } } = this.props;
    return user.id === userId;
  }

  _isLectureAlreadyFetch() {
    return this.props.isFetched;
  }

  selectLectureId() {
    const { match, lectureIdFromLink } = this.props;
    const paramsId = parseInt(match.params.id);

    if (this.isUserFromMainPage(paramsId)) {
      return paramsId;
    } else {
      return parseInt(lectureIdFromLink);
    }
  }

  renderTabs = () => {
    const { lectureIdFromReducer, comment, lecture: { lecture } } = this.props;
    const { selected } = this.state;

    const tabTitle = (title, src) => (
      <TabTitle>
        <TabIcon alt="" src={ src } />
        {title}
      </TabTitle>);

    return (<Tabs id="lecture-tabs" activeKey={ selected } onSelect={ this.handleSelect }>
      <Tab
        eventKey={ 1 }
        title={
          tabTitle(
            '강의 정보',
            selected === 1 ? contentImageActive : contentImage) }>
        <Content
          title={ lecture.title }
          subject={ lecture.subject }
          content={ lecture.content }
          textbookRange={ lecture.textbookRange } />
      </Tab>
      <Tab
        eventKey={ 2 }
        title={
          tabTitle(
            `학생 질문 - ${comment.comments.length}`,
            selected === 2 ? commentImageActive : commentImage) }>
        <Comment lectureId={ lectureIdFromReducer } />
      </Tab>
      {
        this._isLectureOwner() ? (
          <Tab
            eventKey={ 3 }
            title={
              tabTitle('분석',
              selected === 3 ? analysisImageActive : analysisImage) }>
            <Analysis />
          </Tab>
        ) : null
      }
    </Tabs>);
  }

  handleSelect = selected => {
    this.setState({ selected });
  }

  saveQuestionsStateOnEnded = solvedQuestionsState => {
    const { user: { id }, match } = this.props;
    const paramsId = parseInt(match.params.id);

    this.props.saveQuestionsStateOnEnded({
      solvedQuestionsState,
      id,
      isForExternal: !this.isUserFromMainPage(paramsId)
    });
  }

  isUserFromMainPage(id) {
    return id !== -1;
  }
}

Lecture.propTypes = propTypes;
Lecture.defaultProps = defaultProps;

function mapStateToProps(state) {
  const { lecture: { id }, isFetched } = state.flass.lecture.lecture;

  return {
    user: { ...state.flass.user },
    ...state.flass.lecture,
    ...state.flass.video,
    lectureIdFromReducer: id,
    isFetched
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRequestLectureAll: lectureId => ({
      type: FETCH_LECTURE,
      lectureId
    }),
    saveQuestionsStateOnEnded: ({ solvedQuestionsState, id, isForExternal }) => ({
      type: REQUEST_ON_ENDED,
      userId: id,
      solvedQuestionsState,
      isForExternal
    }),
    unmountLecture
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLoading()(Lecture));
