import React, { Component } from 'react';
import PropTypes from 'prop-types';

import QuizWrapperComponent from './QuizWrapper/QuizWrapperComponent';
import QuizIndexComponent from './QuizIndex/QuizIndexComponent';

import './QuizComponentStyles.scss';

const propTypes = {};
const defaultProps = {};

class QuizComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdding: false
    };
  }
  render() {
    return (
      <QuizWrapperComponent>
        <div className="quiz">
          <QuizIndexComponent />
        </div>
      </QuizWrapperComponent>
    );
  }
}

QuizComponent.propTypes = propTypes;
QuizComponent.defaultProps = defaultProps;

export default QuizComponent;
