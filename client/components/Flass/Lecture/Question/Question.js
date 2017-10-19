import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

const { string, oneOfType, arrayOf } = PropTypes;

const propTypes = {
  QuestionListClassName: oneOfType([string, arrayOf(string)]),
  questions: PropTypes.array.isRequired
};
const defaultProps = {
  QuestionListClassName: ''
};

class Question extends Component {

}

Question.propTypes = propTypes;
Question.defaultProps = defaultProps;

export default Question;
