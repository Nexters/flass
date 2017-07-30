import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cyan500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { Route, Switch } from 'react-router-dom';

import FlassGrid from './FlassGrid/FlassGridWithMapping';
import VideoComponent from '../Video/VideoComponent';
import FlassDetail from './FlassDetail/FlassDetailWithMapping';
import Upload from '../Upload';

import FlassDrawer from './FlassDrawer/FlassDrawer';
import FlassContent from './FlassContent';
import './FlassApp.scss';
import FlassAppBar from './FlassAppBar/FlassAppBar';

const childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
const propTypes = {};
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
    return (
      <MuiThemeProvider muiTheme={ flassTheme }>
        <div>
          <FlassAppBar isLogin />
          <FlassContent>
            <Switch>
              <Route exact path="/" component={ FlassGrid } />
              <Route path="/channel/me" component={ FlassGrid } />
              <Route path="/detail/:id" component={ FlassDetail } />
              <Route path="/video" component={ VideoComponent } />
              <Route path="/upload" component={ Upload } />
            </Switch>
          </FlassContent>
          <FlassDrawer />
        </div>
      </MuiThemeProvider>
    );
  }
}

FlassApp.childContextTypes = childContextTypes;
FlassApp.propTypes = propTypes;
FlassApp.defaultProps = defaultProps;

export default FlassApp;
