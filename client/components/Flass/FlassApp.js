import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlassContainer from "./FlassContainer";

const FlassApp = () => {
  return (
    <MuiThemeProvider>
      <FlassContainer/>
    </MuiThemeProvider>
  );
};

export default FlassApp;
