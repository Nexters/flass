import React from 'react';
import { cyan500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Flass from './Flass';

const flassTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 40
  },
});

const FlassApp = () => (
  <MuiThemeProvider muiTheme={ flassTheme }>
    <Flass />
  </MuiThemeProvider>
);

export default FlassApp;
