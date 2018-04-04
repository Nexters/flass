import _ from 'lodash';
import { List } from 'immutable';
import { call, put, takeLatest, take } from 'redux-saga/effects';
import agent from '../agent';
import {
  QuestionBodyAdapter,
  ChoiceBodyAdapter
} from '../../RequestBodyAdapter';
import { createReducer } from '../reducerHelper';

export const ADD_MULTIPLE_CHIOICE_QUESTION = 'ADD_MULTIPLE_CHIOICE_QUESTION';
export function addMultipleChoiceQuestion() {
  return { type: ADD_MULTIPLE_CHIOICE_QUESTION };
}

export const ADD_ANSWER_QUESTION = 'ADD_ANSWER_QUESTION';
export function addAnswerQuestion() {
  return { type: ADD_ANSWER_QUESTION };
}

export const CANCEL_ADDING_QUESTION = 'CANCEL_ADDING_QUESTION';
export function cancelAddingQuestion() {
  return { type: CANCEL_ADDING_QUESTION };
}

export const COMPLETE_ADDING_QUESTION = 'COMPLETE_ADDING_QUESTION';
export function completeAddingQuestion() {
  return { type: COMPLETE_ADDING_QUESTION };
}

export const SAVE_MULTIPLE_CHOICE_QUESTION = 'SAVE_MULTIPLE_CHOICE_QUESTION';
export function saveMultipleChoiceQuestion({
  numOfQuestion,
  numOfChoice,
  checkedQuizIndex,
  TitleInputValue,
  SingleChoiceValues,
  duration,
  played,
  secsOfQuiz
}) {
  return {
    type: SAVE_MULTIPLE_CHOICE_QUESTION,
    payload: {
      numOfQuestion,
      numOfChoice,
      checkedQuizIndex,
      TitleInputValue,
      SingleChoiceValues,
      duration,
      played,
      secsOfQuiz
    }
  };
}


export const ADD_QUESTION_SECS = 'ADD_QUESTION_SECS';
export function addQuestionSecs({ playedSeconds, indexOfQuestion }) {
  return {
    type: ADD_QUESTION_SECS,
    payload: { playedSeconds, indexOfQuestion, isFocused: false }
  };
}


export const FOCUS_ON_QUESTION = 'FOCUS_ON_QUESTION';
export function focusOnQuestion({ label }) {
  return {
    type: FOCUS_ON_QUESTION,
    payload: { label }
  };
}


export const COMPLETE_EDIT_QUESTION = 'COMPLETE_EDIT_QUESTION';
export function completeEditQuestion({ EditedTextStateOfFocusedQuestion }) {
  return {
    type: COMPLETE_EDIT_QUESTION,
    payload: { EditedTextStateOfFocusedQuestion }
  };
}


export const DELETE_COMPLETE_QUESTION = 'DELETE_COMPLETE_QUESTION';
export function deleteCompleteQuestion({ indexOfQuestion }) {
  return {
    type: DELETE_COMPLETE_QUESTION,
    payload: { indexOfQuestion }
  };
}

export const REQUEST_UPLOAD_QUESTIONS = 'REQUEST_UPLOAD_QUESTIONS';
export const INIT_UPLOAD_QUESTIONS = 'INIT_UPLOAD_QUESTIONS';
export function initUploadQuestions() {
  return {
    type: INIT_UPLOAD_QUESTIONS
  };
}

export const SUCCESS_UPLOAD_QUESTIONS = 'SUCCESS_UPLOAD_QUESTIONS';
export const FAIL_UPLOAD_QUESTIONS = 'FAIL_UPLOAD_QUESTIONS';

export const INIT_QUESTION_STATES = 'INIT_QUESTION_STATES';

const INITIAL_STATE = {
  questionSecsStateArray: [],
  stateOfFocusedQuestion: {
    secsStateOfFocusedQuestion: {
      playedSeconds: -1,
      label: '',
      indexOfQuestion: -1,
      isFocused: false
    },
    textStateOfFocusdQuestion: {
      TitleInputValue: '',
      checkedQuizIndex: -1,
      numOfChoice: -1,
      SingleChoiceValues: [],
      secsOfQuiz: -1
    }
  },
  isAdding: false,
  type: null,
  numOfQuestion: 0,
  quizState: [],
  isUploadingQuestionRequestSuccess: false,
  isUploadingQuestionRequestFail: false,
  videoUrl: ''
};
const MULTIPLE_CHOICE_TYPE = 'multiple_choice_type';
const ANSWER_QUESTION_TYPE = 'answer_question_type';

const addQuestionReducer = {
  [ADD_MULTIPLE_CHIOICE_QUESTION]: state => ({
    ...state,
    type: MULTIPLE_CHOICE_TYPE,
    isAdding: true
  }),
  [CANCEL_ADDING_QUESTION]: state => ({
    ...state,
    type: null,
    isAdding: false
  }),
  [COMPLETE_ADDING_QUESTION]: state => ({
    ...state,
    type: null,
    isAdding: false
  })
};

const saveQuestionReducer = {
  [SAVE_MULTIPLE_CHOICE_QUESTION]: (state, action) => {
    const {
      TitleInputValue,
      checkedQuizIndex,
      numOfChoice,
      SingleChoiceValues,
      secsOfQuiz,
      numOfQuestion
    } = action.payload;

    const newMultipleChoiceState = {
      TitleInputValue,
      checkedQuizIndex,
      numOfChoice,
      SingleChoiceValues,
      secsOfQuiz,
      indexOfQuestion: numOfQuestion - 1
    };

    return {
      ...state,
      quizState: _.concat(state.quizState, newMultipleChoiceState),
      numOfQuestion: state.numOfQuestion
    };
  }
};

const questionSecsReducer = {
  [ADD_QUESTION_SECS]: (state, action) => {
    const { playedSeconds, indexOfQuestion, isFocused } = action.payload;
    const newSecsState = {
      playedSeconds: parseFloat(playedSeconds),
      label: `Q${indexOfQuestion}`,
      indexOfQuestion,
      isFocused
    };

    return {
      ...state,
      questionSecsStateArray: _.concat(state.questionSecsStateArray, newSecsState)
    };
  }
};

const focusQuestionReducer = {
  [FOCUS_ON_QUESTION]: (state, action) => {
    const {
      secsStateOfFocusedQuestion,
      textStateOfFocusdQuestion
    } = findQuestionSecsStateAndTextStateByLabel(state.questionSecsStateArray, state.quizState, action.payload.label);

    return {
      ...state,
      stateOfFocusedQuestion: {
        secsStateOfFocusedQuestion,
        textStateOfFocusdQuestion
      }
    };
  }
};

function findQuestionSecsStateAndTextStateByLabel(questionSecsStateArray, questionTextStateArray, targetLabel) {
  let index = -1;

  const secsStateOfFocusedQuestion = List(questionSecsStateArray)
    .filter(({ label }, i) => {
      if (label === targetLabel) {
        index = i;

        return true;
      }

      return false;
    })
    .map(secsState => ({ ...secsState, isFocused: true }))
    .toArray()[0];

  const textStateOfFocusdQuestion = findQuestionTextStateByLabel(questionTextStateArray, index);

  return { secsStateOfFocusedQuestion, textStateOfFocusdQuestion };
}

function findQuestionTextStateByLabel(questionTextStateArray, index) {
  return questionTextStateArray[index];
}

const editQuestionReducer = {
  [COMPLETE_EDIT_QUESTION]: (state, action) => {
    const { EditedTextStateOfFocusedQuestion } = action.payload;
    const { indexOfQuestion } = EditedTextStateOfFocusedQuestion;
    const UpdatedQuizState = List(state.quizState)
      .update(indexOfQuestion, () => EditedTextStateOfFocusedQuestion)
      .toArray();

    return {
      ...state,
      quizState: UpdatedQuizState,
      stateOfFocusedQuestion: INITIAL_STATE.stateOfFocusedQuestion
    };
  }
};

const deleteQuestionReducer = {
  [DELETE_COMPLETE_QUESTION]: (state, action) => {
    const { indexOfQuestion } = action.payload;

    const UpdatedQuizState = List(state.quizState)
      .delete(indexOfQuestion)
      .toArray();
    const UpdatedQuizSecsState = List(state.questionSecsStateArray)
      .delete(indexOfQuestion)
      .map((secsState, i) => ({
        ...secsState,
        indexOfQuestion: i + 1,
        label: `Q${i + 1}`,
        isFocused: false
      }))
      .toArray();

    return {
      ...state,
      quizState: UpdatedQuizState,
      questionSecsStateArray: UpdatedQuizSecsState,
      stateOfFocusedQuestion: INITIAL_STATE.stateOfFocusedQuestion
    };
  }
};

const requestQuestionReducer = {
  [SUCCESS_UPLOAD_QUESTIONS]: (state, { payload }) => ({
    ...state,
    isUploadingQuestionRequestSuccess: true,
    lectureUrl: payload.lectureUrl
  }),
  [FAIL_UPLOAD_QUESTIONS]: state => ({
    ...state,
    isUploadingQuestionRequestFail: true
  })
};

const initQuestionStatesReducer = {
  [INIT_QUESTION_STATES]: () => ({
    ...INITIAL_STATE
  })
};

const QuestionReducers = createReducer(INITIAL_STATE, {
  ...addQuestionReducer,
  ...saveQuestionReducer,
  ...questionSecsReducer,
  ...questionSecsReducer,
  ...focusQuestionReducer,
  ...editQuestionReducer,
  ...deleteQuestionReducer,
  ...requestQuestionReducer,
  ...initQuestionStatesReducer
});

export default QuestionReducers;

function* requestUploadQuestions({ questionState }) {
  try {
    yield call(uploadQuestionsApi, questionState);
    yield put({ type: SUCCESS_UPLOAD_QUESTIONS });
  } catch (error) {
    yield put({ type: FAIL_UPLOAD_QUESTIONS, error });
  }
}

function* uploadQuestionsApi(questionState) {
  for (let questionIndex = 0; questionIndex < questionState.length; questionIndex += 1) {
    const questionstate = questionState[questionIndex];
    const { SingleChoiceValues } = questionstate;
    const questionBody = yield call(QuestionBodyAdapter.uploadByQuestionId, lectureId, questionstate);
    const { id } = yield call(agent.Question.uploadByLectureId, questionBody);

    for (let choiceIndex = 0; choiceIndex < SingleChoiceValues.length; choiceIndex += 1) {
      const singleChoiceValues = SingleChoiceValues[choiceIndex];
      const choiceBody = yield call(ChoiceBodyAdapter.upload, id, singleChoiceValues);
      yield call(agent.Choice.upload, choiceBody);
    }
  }
}

export function* rootSaga() {
  yield takeLatest(REQUEST_UPLOAD_QUESTIONS, requestUploadQuestions);
}
