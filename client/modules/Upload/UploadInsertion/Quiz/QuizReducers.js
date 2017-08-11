import _ from 'lodash';
import { List } from 'immutable';
import {
  ADD_MULTIPLE_CHIOICE_QUESTION,
  ADD_ANSWER_QUESTION,
  CANCEL_ADDING_QUESTION,
  COMPLETE_ADDING_QUESTION,
  SAVE_MULTIPLE_CHOICE_QUESTION,
  ADD_QUESTION_SECS,
  FOCUS_ON_QUESTION,
  COMPLETE_EDIT_QUESTION
} from './QuizActions';

const INITIAL_STATE = {
  questionSecsStateArray: [],
  stateOfFocusedQuestion: {
    secsStateOfFocusedQuestion: {
      playedSeconds: -1,
      label: '',
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
  quizState: []
};
const MULTIPLE_CHOICE_TYPE = 'multiple_choice_type';
const ANSWER_QUESTION_TYPE = 'answer_question_type';

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_MULTIPLE_CHIOICE_QUESTION:
      return { ...state, type: MULTIPLE_CHOICE_TYPE, isAdding: true };
    case ADD_ANSWER_QUESTION:
      return { ...state, type: ANSWER_QUESTION_TYPE, isAdding: true };
    case CANCEL_ADDING_QUESTION:
      return { ...state, type: null, isAdding: false };
    case COMPLETE_ADDING_QUESTION:
      return { ...state, type: null, isAdding: false };
    case SAVE_MULTIPLE_CHOICE_QUESTION: {
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
    case ADD_QUESTION_SECS: {
      const { playedSeconds, label, isFocused } = action.payload;
      const newSecsState = {
        playedSeconds: parseFloat(playedSeconds),
        label,
        isFocused
      };

      return {
        ...state,
        questionSecsStateArray: _.concat(state.questionSecsStateArray, newSecsState)
      };
    }

    case FOCUS_ON_QUESTION: {
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

    case COMPLETE_EDIT_QUESTION: {
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
    default:
      return state;
  }
}

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
