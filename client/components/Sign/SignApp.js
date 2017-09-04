import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cyan500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import './SignApp.scss';
import Intro from './Intro/Intro';
import FlassAppBar from '../Flass/AppBar/AppBar';

const signTheme = getMuiTheme({
  palette: {
    textColor: cyan500
  },
  appBar: {
    height: 40
  }
});

const childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
const propTypes = {
  children: PropTypes.element.isRequired
};
const defaultProps = {};

class FlassApp extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    const { children } = this.props;
    return (
      <MuiThemeProvider muiTheme={ signTheme }>
        <div>
          <FlassAppBar isLogin={ false } />
          <div className="sign-app-content">
            <Intro />
            <div className="sign-app-right-content">
              { children }
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

FlassApp.childContextTypes = childContextTypes;
FlassApp.propTypes = propTypes;
FlassApp.defaultProps = defaultProps;

export default FlassApp;
