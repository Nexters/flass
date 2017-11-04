import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Tab } from './styled';

const { number, func, bool } = PropTypes;

const propTypes = {
  isActive: bool.isRequired,
  questionId: number.isRequired,
  questionIndex: number.isRequired,
  handleSelect: func.isRequired
};
const defaultProps = {};

class AnalysisTabItemComponent extends PureComponent {
  render() {
    const { questionId, questionIndex, isActive } = this.props;

    return (
      <Tab.Wrapper key={ questionId }>
        <Tab.Item
          style={ this._getTabItemStyle(isActive) }
          onClick={ () => this.props.handleSelect(questionIndex) }>
          { `Q${questionIndex + 1}` }
        </Tab.Item>
      </Tab.Wrapper>
    );
  }

  _getTabItemStyle = isActive => (isActive ? Tab.ActiveTabItemStyle : {})
}

AnalysisTabItemComponent.propTypes = propTypes;
AnalysisTabItemComponent.defaultProps = defaultProps;

export default AnalysisTabItemComponent;
