import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NavComponentStyles.scss';

const propTypes = {
  children: PropTypes.element.isRequired,
  isRight: PropTypes.string
};

const defaultProps = {
  isRight: false
};

const NavComponent = props => (
  <div
    className={ classNames(
      'flass-nav',
      { 'flass-nav--right': props.isRight }
    ) }>
    { props.children }
  </div>
);

NavComponent.propTypes = propTypes;
NavComponent.defaultProps = defaultProps;

export default NavComponent;
