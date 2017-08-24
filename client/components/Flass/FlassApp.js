import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { cyan500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { Route, Switch } from 'react-router-dom';

import Grid from './Grid/GridContainer';
import Detail from './Detail/DetailContainer';
import Upload from '../Upload';
import Drawer from './Drawer/Drawer';
import Content from './Content';
import './FlassApp.scss';
import AppBar from './AppBar/AppBar';

const { func, number, object, bool } = PropTypes;

const childContextTypes = {
  muiTheme: object.isRequired
};
const propTypes = {
  signOutFlassService: func.isRequired,
  id: number.isRequired,
};

const defaultProps = {};

const flassTheme = getMuiTheme({
  palette: {
    textColor: cyan500
  },
  appBar: {
    height: 40
  }
});

class FlassApp extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    const { id } = this.props;

    return (
      <MuiThemeProvider muiTheme={ flassTheme }>
        <div>
          <Drawer />
          <AppBar
            isLogin={id !== -1}
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
        <Route path="/home" component={ Grid } />
        <Route path="/detail/:id" component={ Detail } />
        <Route path="/upload" component={ Upload } />
      </Switch>
    );
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
