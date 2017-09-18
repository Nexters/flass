import React from 'react';
import PropTypes from 'prop-types';

import './IndicatorBarWrapperComponentStyles.scss';

const propTypes = {
  children: PropTypes.element.isRequired
};
const defaultProps = {};

const IndicatorBarWrapperComponent = ({ children }) => (
  <div className="indicator-bar-wrapper">
    { children }
  </div>
);

IndicatorBarWrapperComponent.propTypes = propTypes;
IndicatorBarWrapperComponent.defaultProps = defaultProps;

export default IndicatorBarWrapperComponent;
