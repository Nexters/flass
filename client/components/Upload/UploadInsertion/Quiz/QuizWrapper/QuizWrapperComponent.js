import React from 'react';
import PropTypes from 'prop-types';

import './QuizWrapperComponentStyles.scss';

const propTypes = {
  children: PropTypes.element.isRequired
};
const defaultProps = {};

const QuizWrapperComponent = ({ children }) => (
  <div className="quiz-wrapper">
    { children }
  </div>
);

QuizWrapperComponent.propTypes = propTypes;
QuizWrapperComponent.defaultProps = defaultProps;

export default QuizWrapperComponent;
