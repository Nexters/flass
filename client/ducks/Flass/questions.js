import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import {
  createReducer
} from '../reducerHelper';
import agent from '../agent';
import { QuestionResDataAdapter } from '../../ResponseDataAdapter';

export const FETCH_QUESTION = 'FETCH_QUESTION';
export const FETCH_READY_QUESTION = 'FETCH_READY_QUESTION';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';

export const ADD_QUESTION = 'ADD_QUESTION';

export const UPDATE_SOLVED_QUESTION = 'UPDATE_SOLVED_QUESTION';

export function updateSolvedQuestion({ id, indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer }) {
  return {
    type: UPDATE_SOLVED_QUESTION,
    payload: { id, indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer }
  };
}

const initialState = {
  totalCount: 0,
  questions: {
    textStateOfQuestions: [],
    secsStateOfQuestions: []
  },
  solvedQuestionsState: []
};

const fetchQuestionReducer = {
  [FETCH_QUESTION_SUCCESS]: (state, { questions }) => ({
    ...state,
    questions
  })
};

const updateSolvedQuestionReducer = {
  [UPDATE_SOLVED_QUESTION]: (state, action) => {
    const { id, indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer } = action.payload;

    return {
      ...state,
      solvedQuestionsState: _.concat(
        state.solvedQuestionsState,
        { id, indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer }
      )
    };
  }
};

const QuestionReducers = createReducer(initialState, {
  ...fetchQuestionReducer,
  ...updateSolvedQuestionReducer
});

export default QuestionReducers;

function* fetchQuestion({ lectureId }) {
  yield put({ type: FETCH_READY_QUESTION });

  try {
    const questions = yield call(agent.Question.byLectureId, lectureId);
    const questionsPayload = yield call(fetchChoiceApi, questions);

    yield put({
      type: FETCH_QUESTION_SUCCESS,
      questions: questionsPayload
    });
  } catch (err) {
    yield put({
      type: FETCH_QUESTION_ERROR,
      message: err.message
    });
  }
}

function* fetchChoiceApi(questions) {
  const questionsPayload = {
    textStateOfQuestions: [],
    secsStateOfQuestions: []
  };

  for (let qIndex = 0; qIndex < questions.length; qIndex += 1) {
    const question = questions[qIndex];
    const choices = yield call(agent.Choice.fetch, question.id);
    const questionState = yield call(
      QuestionResDataAdapter.fetch,
      question,
      choices,
      qIndex
    );
    questionsPayload.textStateOfQuestions.push(questionState.textStateOfQuestions);
    questionsPayload.secsStateOfQuestions.push(questionState.secsStateOfQuestions);
  }

  return questionsPayload;
}

export function* rootSaga() {
  yield takeLatest(FETCH_QUESTION, fetchQuestion);
}
