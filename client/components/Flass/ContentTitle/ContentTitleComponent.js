import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ContentTitleComponentStyles.scss';

const propTypes = {
  title: PropTypes.string.isRequired
};
const defaultProps = {};

const FlassContentTitleComponent = props => (
  <div className={ classNames('flass-content-title') }>
    { props.title }
  </div>
);

FlassContentTitleComponent.propTypes = propTypes;
FlassContentTitleComponent.defaultProps = defaultProps;

export default FlassContentTitleComponent;
