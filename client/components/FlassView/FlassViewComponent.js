import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import {
  MuiThemeProvider,
  getMuiTheme,
  baseTheme,
  flassTheme
} from '../FlassCommon/MaterialUI';

import Drawer from '../Flass/Drawer/Drawer';
import Content from '../Flass/Content';
import AppBar from '../Flass/AppBar/AppBar';
import Detail from '../Flass/Detail/DetailContainer';

const { shape, string, object, number } = PropTypes;

const childContextTypes = {
  muiTheme: object.isRequired
};

const propTypes = {
  match: shape({
    params: shape({
      id: string
    })
  }).isRequired,
  id: number.isRequired
};
const defaultProps = {};


class FlassViewComponent extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;

    if (!id) {
      return (
        <div>
          id is not provided
        </div>
      );
    }

    return (
      <MuiThemeProvider muiTheme={ flassTheme }>
        <div>
          <Drawer />
          <AppBar
            isLogin={ this.isUserLogin() } />

          <Content>
            <Detail
              lectureId={ id } />
          </Content>
        </div>
      </MuiThemeProvider>
    );
  }

  @autobind
  isUserLogin() {
    const { id } = this.props;
    return id !== -1;
  }
}

FlassViewComponent.childContextTypes = childContextTypes;
FlassViewComponent.propTypes = propTypes;
FlassViewComponent.defaultProps = defaultProps;

export default FlassViewComponent;
