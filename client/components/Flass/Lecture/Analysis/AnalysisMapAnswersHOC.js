// TODO: selector 이용
import React, { PureComponent } from 'react';

export const AnalysisMapAnswersHOC = WrappedComponent => {
  class WithMappedAnswers extends PureComponent {
    render() {
      const usersOfAnswers = this._getUsersOfAnswers();
      return (
        <WrappedComponent
          usersOfAnswers={ usersOfAnswers }
          { ...this.props } />
      );
    }

    _getUsersOfAnswers = () => {
      const { questions, questionIndex, question_answers, answers } = this.props;
      if (questions.length === 0) {
        return [];
      }
      const question = questions[questionIndex];
      const correctAnswer = question['correct_answer'];

      return question_answers.map((questionAnswer, index) => ({
        id: questionAnswer.id,
        answer: questionAnswer.answer,
        isCorrect: index === correctAnswer,
        userAnswers: answers.filter(answer => index == parseInt(answer.answer))
      }));
    }
  }

  return WithMappedAnswers;
};
