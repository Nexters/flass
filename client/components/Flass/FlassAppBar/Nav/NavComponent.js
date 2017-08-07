import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NavComponentStyles.scss';

const propTypes = {
  children: PropTypes.any.isRequired,
  isRight: PropTypes.bool,
  Header: PropTypes.bool
};

const defaultProps = {
  isRight: false,
  Header: false
};

const NavComponent = props => (
  <div
    className={ classNames(
      'flass-nav',
      { 'flass-nav--right': props.isRight },
      { 'flass-nav__header': props.Header }
    ) }>
    { props.children }
  </div>
);

NavComponent.propTypes = propTypes;
NavComponent.defaultProps = defaultProps;

export default NavComponent;
