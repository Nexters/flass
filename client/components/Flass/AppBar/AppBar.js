import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Navbar, NavItem } from 'react-bootstrap';
import styled from 'styled-components';
import NavbarComponent from './Navbar/NavbarComponent';
import NavComponent from './Nav/NavComponent';
import UserAppBar from './UserAppBarContainer';
import color from '../common/colors.scss';
import './AppBar.scss';

const NavTitle = styled.span`
  font-family: NotoSansCJKkr;
  font-size: 20px;
  font-weight: 100;
  color: ${color['cool-grey']};
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.26);
`;

const { func, bool } = PropTypes;

const propTypes = {
  onClickLogoutBtn: func.isRequired,
  isLogin: bool
};

const defaultProps = {
  isLogin: false
};

class AppBar extends Component {
  componentDidMount() {}

  render() {
    const { isLogin } = this.props;

    return (
      <NavbarComponent>
        <NavComponent Header>
          <NavTitle>
            First Flip Learning Platform
          </NavTitle>
        </NavComponent>

        <NavComponent isRight>
          { isLogin && <UserAppBar /> }
          <button
            onClick={ this.onClickLogoutBtn }>
            플래스 로그아웃
          </button>
        </NavComponent>
      </NavbarComponent>
    );
  }
  
  @autobind
  onClickLogoutBtn() {
    this.props.onClickLogoutBtn();
  }
}

AppBar.propTypes = propTypes;
AppBar.defaultProps = defaultProps;

export default AppBar;
