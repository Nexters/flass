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

  renderChild() {
    const { questions } = this.props;
    return questions.map(question => {
      const content = (
        <div><span>{question.questionAt}</span> - {question.content}</div>);
      return (
        <ListItem
          key={question.id}
          primaryText={content} />
      );
    });
  }

  render() {
    const { QuestionListClassName } = this.props;

    return (
      <List className={ classNames(QuestionListClassName) }>
        <Subheader>질문 리스트</Subheader>
        <Divider />
        {this.renderChild()}
      </List>
    );
  }
}

Question.propTypes = propTypes;
Question.defaultProps = defaultProps;

export default Question;
