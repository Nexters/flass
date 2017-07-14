import React from 'react';
import PropTypes from 'prop-types';

import './FlassContent.scss';

const propTypes = {
  children: PropTypes.element.isRequired
};
const defaultProps = {};

const FlassContentLayoutComponent = props => (
  <div className="flass-content-container">
    { props.children }
  </div>
);

FlassContentLayoutComponent.propTypes = propTypes;
FlassContentLayoutComponent.defaultProps = defaultProps;

export default FlassContentLayoutComponent;
