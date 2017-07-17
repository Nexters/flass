import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cyan500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import FlassUserAppBar from './FlassAppBar/FlassUserAppBar';
import FlassDrawer from './FlassDrawer/FlassDrawer';
import FlassContent from './FlassContent';
import './FlassApp.scss';

const flassTheme = getMuiTheme({
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
    return (
      <MuiThemeProvider muiTheme={ flassTheme }>
        <div>
          <AppBar
            className="flass-app-bar"
            showMenuIconButton={ false }
            title="Flass"
            titleStyle={ { paddingTop: 10, paddingLeft: 3 } }
            iconElementRight={ <FlassUserAppBar /> } />

          <FlassContent>
            { this.props.children }
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
