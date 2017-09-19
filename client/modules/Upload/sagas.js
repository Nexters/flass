import { all, call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import agent from '../agent';
import {
  INIT_LECTURE_AND_QUESTIONS, initUpload,
  UPLOAD_LECTURE_AND_QUESTIONS,
} from './actions';
import {
  SUCCESS_UPLOAD_QUESTIONS,
  FAIL_UPLOAD_QUESTIONS, INIT_UPLOAD_QUESTIONS, initUploadQuestions,
} from './UploadInsertion/Quiz/actions';

function* uploadLectureAndQuestions({
  questionStates,
  title,
  description,
  subject,
  textbook,
  videoURL,
  thumbURL
}) {
  try {
    const lectureResponse = yield call(agent.Lecture.upload, {
      title,
      subject,
      content: description,
      textbook_range: textbook,
      url: videoURL,
      thumbnail_url: thumbURL,
      duration: questionStates.duration
    });
    yield all(_.map(questionStates,
      questionState => uploadQuestion(lectureResponse, questionState)));
    yield put({
      type: SUCCESS_UPLOAD_QUESTIONS,
      payload: {
        lectureId: lectureResponse.id
      }
    });
  } catch (error) {
    yield put({ type: FAIL_UPLOAD_QUESTIONS, error });
  }
}

function* uploadQuestion(lectureResponse, questionState) {
  const {
    TitleInputValue,
    checkedQuizIndex,
    secsOfQuiz
  } = questionState;

  const questionResponse = yield call(agent.Question.uploadByLectureId, {
    lecture_id: lectureResponse.id,
    content: TitleInputValue,
    correct_answer: checkedQuizIndex.toString(),
    question_at: parseInt(secsOfQuiz)
  });
  const { SingleChoiceValues } = questionState;
  yield all(_.map(SingleChoiceValues,
    singleChoiceValue => uploadChoice(questionResponse,
      singleChoiceValue)));
}

function* uploadChoice(questionResponse, singleChoiceValue) {
  const {
    choiceTextValue
  } = singleChoiceValue;

  yield call(agent.Choice.upload, {
    question_id: questionResponse.id,
    answer: choiceTextValue
  });
}

function* initUploadLectureAndQuestions() {
  yield put(initUpload());
  yield put(initUploadQuestions());
}

export default function* rootSaga() {
  yield takeLatest(UPLOAD_LECTURE_AND_QUESTIONS, uploadLectureAndQuestions);
  yield takeLatest(INIT_LECTURE_AND_QUESTIONS, initUploadLectureAndQuestions);
}
