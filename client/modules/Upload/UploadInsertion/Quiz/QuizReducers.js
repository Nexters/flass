import _ from 'lodash';
import { List } from 'immutable';
import { createReducer } from '../../../reducerHelper';
import {
  ADD_MULTIPLE_CHIOICE_QUESTION,
  CANCEL_ADDING_QUESTION,
  COMPLETE_ADDING_QUESTION,
  SAVE_MULTIPLE_CHOICE_QUESTION,
  ADD_QUESTION_SECS,
  FOCUS_ON_QUESTION,
  COMPLETE_EDIT_QUESTION,
  DELETE_COMPLETE_QUESTION,
  SUCCESS_UPLOAD_QUESTIONS,
  FAIL_UPLOAD_QUESTIONS
} from './QuizActions';

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
    lectureUrl: `http://localhost:3000/lecture/${payload.lectureId}`
  }),
  [FAIL_UPLOAD_QUESTIONS]: state => ({
    ...state,
    isUploadingQuestionRequestFail: true
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
  ...requestQuestionReducer
});

export default QuestionReducers;
