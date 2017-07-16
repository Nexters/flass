import React from 'react';
import PropTypes from 'prop-types';

import './FlassContent.scss';

const propTypes = {
  children: PropTypes.element.isRequired
};
const defaultProps = {};

const FlassContent = props => (
  <div className="flass-content-container">
    { props.children }
  </div>
);

FlassContent.propTypes = propTypes;
FlassContent.defaultProps = defaultProps;

export default FlassContent;
