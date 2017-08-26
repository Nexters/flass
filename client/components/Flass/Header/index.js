import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const propTypes = {
  title: PropTypes.string.isRequired
};
const defaultProps = {
  title: ''
};

const Header = props => (
  <div className={ classNames('header') }>
    { props.title }
  </div>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
