import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
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
      <Navbar className="flass-app-bar" staticTop>
        <Navbar.Header className="flass-app-bar-title">
          <Navbar.Brand>
            First Flip Learning Platform
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem>
            { isLogin ? <FlassUserAppBar /> : '' }
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

FlassAppBar.propTypes = propTypes;
FlassAppBar.defaultProps = defaultProps;

export default FlassAppBar;
