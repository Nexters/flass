import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NavbarComponentStyles.scss';

const propTypes = {
  children: PropTypes.element.isRequired
};

const NavbarComponent = props => (
  <div
    className={ classNames(
      'flass-app-bar',
      'flass-app-bar--no-b-margin',
      'flass-app-bar--static-top') }>
    { props.children }
  </div>
);

NavbarComponent.propTypes = propTypes;

export default NavbarComponent;
