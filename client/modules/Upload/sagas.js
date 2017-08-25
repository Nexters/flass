import { call, put, takeLatest } from 'redux-saga/effects';
import agent from '../agent';
import {
  LectureBodyAdapter,
  QuestionBodyAdapter,
  ChoiceBodyAdapter
} from '../../RequestBodyAdapter';
import {
  UPLOAD_LECTURE_AND_QUESTIONS
} from './Actions';
import {
  SUCCESS_UPLOAD_QUESTIONS,
  FAIL_UPLOAD_QUESTIONS
} from './UploadInsertion/Quiz/QuizActions';

function* uploadLectureAndQuestions({
  questionState,
  title,
  description,
  subject,
  textbook,
  videoURL,
  thumbURL
}) {
  try {
    const lectureBody = yield call(LectureBodyAdapter.upload, {
      questionState,
      title,
      description,
      subject,
      textbook,
      videoURL,
      thumbURL
    });

    const lectureResponse = yield call(agent.Lecture.upload, lectureBody);

    for (let qIndex = 0; qIndex < questionState.length; qIndex += 1) {
      const questionstate = questionState[qIndex];
      const questionBody = yield call(
        QuestionBodyAdapter.uploadByQuestionId,
        lectureResponse.id,
        questionstate
      );
      const questionResponse = yield call(agent.Question.uploadByLectureId, questionBody);

      const { SingleChoiceValues } = questionstate;

      for (let cIndex = 0; cIndex < SingleChoiceValues.length; cIndex += 1) {
        const singleChoiceValues = SingleChoiceValues[cIndex];
        const choiceBody = yield call(
          ChoiceBodyAdapter.upload,
          questionResponse.id,
          singleChoiceValues
        );
        yield call(agent.Choice.upload, choiceBody);
      }
    }

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

export default function* rootSaga() {
  yield takeLatest(UPLOAD_LECTURE_AND_QUESTIONS, uploadLectureAndQuestions);
}