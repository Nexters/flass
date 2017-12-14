import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import autobind from 'autobind-decorator';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  MuiThemeProvider,
  getMuiTheme,
  baseTheme,
  flassTheme
} from '../FlassCommon/MaterialUI';
import Grid from './Grid/Grid';
import Lecture from './Lecture/Lecture';
import Upload from './Upload';
import Drawer from '../FlassCommon/Drawer/Drawer';
import Content from '../FlassCommon/Content';
import AppBar from '../FlassCommon/AppBar/AppBar';
import './FlassApp.scss';
import { fetchUser } from '../../ducks/Flass/users';
import { logout } from '../../ducks/Sign/signs';

const FlassAppBox = styled.div`
  height: 100%;
`;

const { func, number, object } = PropTypes;

const childContextTypes = {
  muiTheme: object.isRequired
};
const propTypes = {
  signOutFlassService: func.isRequired,
  id: number.isRequired
};

const defaultProps = {};


class FlassApp extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ flassTheme }>
        <FlassAppBox>
          <Drawer />
          <AppBar
            isLogin={ this.isUserLogin() }
            onClickLogoutBtn={ this.signOutFlassService } />
          <Content>
            {this.renderContent()}
          </Content>
        </FlassAppBox>
      </MuiThemeProvider>
    );
  }

  renderContent() {
    return (
      <Switch>
        <Route exact path="/" component={ Grid } />
        <Route exact path="/home" component={ Grid } />
        <Route exact path="/lecture/:id" component={ Lecture } />
        <Route exact path="/upload" component={ Upload } />
        <Route path="/*" render={ () => <Redirect to="/error" /> } />
      </Switch>
    );
  }

  @autobind
  isUserLogin() {
    const { id } = this.props;
    return id !== -1;
  }

  @autobind
  signOutFlassService() {
    this.props.signOutFlassService();
  }
}

FlassApp.childContextTypes = childContextTypes;
FlassApp.propTypes = propTypes;
FlassApp.defaultProps = defaultProps;


function mapStateToProps(state) {
  return {
    ...state.flass.user,
    ...state.sign
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUser,
    signOutFlassService: logout
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassApp);
