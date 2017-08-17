export const LOAD_VIDEO = 'flassdetail/load_video';
export const SOLVED_ONE_QUESTION = 'flassdetail/solved_one_question';

export function flassDetailLoadVideo() {
  return {
    type: LOAD_VIDEO
  };
}

export function flassDetailSolvedOneQuestion({ indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer }) {
  return {
    type: SOLVED_ONE_QUESTION,
    payload: { indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer }
  };
}
