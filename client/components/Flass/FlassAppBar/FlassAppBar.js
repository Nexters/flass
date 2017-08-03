import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavItem } from 'react-bootstrap';
import NavbarComponent from './Navbar/NavbarComponent';
import NavComponent from './Nav/NavComponent';
import FlassUserAppBar from './FlassUserAppBar';
import './FlassAppBar.scss';


const propTypes = {
  isLogin: PropTypes.bool
};

const defaultProps = {
  isLogin: false
};

class FlassAppBar extends Component {
  componentDidMount() {}

  render() {
    const { isLogin } = this.props;

    return (
      <NavbarComponent>
        <Navbar.Header className="flass-app-bar-title">
          <Navbar.Brand>
            First Flip Learning Platform
          </Navbar.Brand>
        </Navbar.Header>
        <NavComponent isRight>
          <NavItem>
            { isLogin ? <FlassUserAppBar /> : '' }
          </NavItem>
        </NavComponent>
      </NavbarComponent>
    );
  }
}

FlassAppBar.propTypes = propTypes;
FlassAppBar.defaultProps = defaultProps;

export default FlassAppBar;
