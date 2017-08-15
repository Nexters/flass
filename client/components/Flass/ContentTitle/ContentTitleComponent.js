import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ContentTitleComponentStyles.scss';

const propTypes = {
  title: PropTypes.string.isRequired
};
const defaultProps = {};

const ContentTitleComponent = props => (
  <div className={ classNames('flass-content-title') }>
    { props.title }
  </div>
);

ContentTitleComponent.propTypes = propTypes;
ContentTitleComponent.defaultProps = defaultProps;

export default ContentTitleComponent;
