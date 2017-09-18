import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Route, Switch } from 'react-router-dom';

import {
  MuiThemeProvider,
  getMuiTheme,
  baseTheme,
  flassTheme
} from '../FlassCommon/MaterialUI';

import Grid from './Grid/GridContainer';
import Lecture from './Lecture/LectureContainer';
import Upload from './Upload';
import Drawer from '../FlassCommon/Drawer/Drawer';
import Content from '../FlassCommon/Content';
import AppBar from '../FlassCommon/AppBar/AppBar';

import './FlassApp.scss';

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
        <div>
          <Drawer />
          <AppBar
            isLogin={ this.isUserLogin() }
            onClickLogoutBtn={ this.signOutFlassService } />

          <Content>
            {this.renderContent()}
          </Content>
        </div>
      </MuiThemeProvider>
    );
  }

  renderContent() {
    return (
      <Switch>
        <Route exact path="/" component={ Grid } />
        <Route exact path="/home" component={ Grid } />
        <Route exact path="/detail/:id" component={ Lecture } />
        <Route exact path="/upload" component={ Upload } />
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

export default FlassApp;
