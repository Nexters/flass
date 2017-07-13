import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cyan500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

// import Flass from './Flass';
import FlassUserAppBar from './FlassUserAppBar';
import FlassDrawer from './FlassDrawer';

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
          <main>
            { this.props.children }
          </main>
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
