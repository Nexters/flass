import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ContentWrapperComponentStyles.scss';

const propTypes = {
  children: PropTypes.element.isRequired
};
const defaultProps = {};

const ContentWrapperComponent = props => (
  <div
    className={ classNames('flass-content-wrapper') }>
    { props.children }
  </div>
);

ContentWrapperComponent.propTypes = propTypes;
ContentWrapperComponent.defaultProps = defaultProps;

export default ContentWrapperComponent;
