import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FlassContentWrapperComponentStyles.scss';

const propTypes = {
  children: PropTypes.element.isRequired
};
const defaultProps = {};

const FlassContentWrapperComponent = props => (
  <div
    className={ classNames('flass-content-wrapper') }>
    { props.children }
  </div>
);

FlassContentWrapperComponent.propTypes = propTypes;
FlassContentWrapperComponent.defaultProps = defaultProps;

export default FlassContentWrapperComponent;
