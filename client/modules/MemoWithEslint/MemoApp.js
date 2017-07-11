import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MemoContainerWrapper from './MemoContainerWrapper';

const propTypes = {};

const defaultProps = {};

class MemoApp extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <MemoContainerWrapper />
      </MuiThemeProvider>
    );
  }
}

MemoApp.propTypes = propTypes;
MemoApp.defaultProps = defaultProps;

export default MemoApp;
