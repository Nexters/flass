import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  content: PropTypes.string
};
const defaultProps = {
  content: ''
};

const TooltipComponent = ({ content }) => (
  <div className="tooltiptext">
    { content }
  </div>
);

TooltipComponent.propTypes = propTypes;
TooltipComponent.defaultProps = defaultProps;

export default TooltipComponent;
