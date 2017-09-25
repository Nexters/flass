import React from 'react';
import PropTypes from 'prop-types';

const { string, func } = PropTypes;

const propTypes = {
  onMouseOverOnBar: func.isRequired,
  onMouseOutFromBar: func.isRequired,
  content: string
};
const defaultProps = {
  content: ''
};

const TooltipComponent = ({ content, onMouseOverOnBar, onMouseOutFromBar }) => (
  <div
    className="tooltiptext"
    onMouseOver={ onMouseOverOnBar }
    onMouseOut={ onMouseOutFromBar }>
    { content }
  </div>
);

TooltipComponent.propTypes = propTypes;
TooltipComponent.defaultProps = defaultProps;

export default TooltipComponent;
