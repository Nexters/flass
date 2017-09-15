import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const { string, element } = PropTypes;

const propTypes = {
  title: string.isRequired,
};
const defaultProps = {
};

const Header = ({ title }) => (
  <div className={ classNames('header') }>
    { title }
  </div>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
