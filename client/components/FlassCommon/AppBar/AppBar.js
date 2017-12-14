import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import styled from 'styled-components';
import NavbarComponent from './Navbar/NavbarComponent';
import NavComponent from './Nav/NavComponent';
import UserAppBar from './UserAppBar/UserAppBar';
import color from '../../../css/base/colors.scss';
import './AppBar.scss';

const NavTitle = styled.span`
  font-family: NotoSansCJKkr;
  font-size: 1.4285rem;
  font-weight: 100;
  color: ${color['cool-grey']};
  text-shadow: 0.0714rem 0.0714rem 0.0714rem rgba(0, 0, 0, 0.26);
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
        {
          isLogin ?
          (<NavComponent isRight>
            <UserAppBar
              onClickLogoutBtn={ this.onClickLogoutBtn } />
          </NavComponent>) :
          null
        }
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
