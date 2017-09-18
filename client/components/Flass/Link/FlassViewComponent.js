import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import {
  MuiThemeProvider,
  getMuiTheme,
  baseTheme,
  flassTheme
} from '../../FlassCommon/MaterialUI';

import Drawer from '../../FlassCommon/Drawer/Drawer';
import Content from '../../FlassCommon/Content';
import AppBar from '../../FlassCommon/AppBar/AppBar';
import Lecture from '../Lecture/LectureContainer';

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
            <Lecture
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
