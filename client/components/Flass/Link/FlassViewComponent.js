import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import Lecture from '../Lecture/Lecture';
import { actions as signActions } from '../../../ducks/Sign/signs';

const { shape, string, object, number, func } = PropTypes;

const childContextTypes = {
  muiTheme: object.isRequired
};

const propTypes = {
  match: shape({
    params: shape({
      id: string
    })
  }).isRequired,
  signOutFlassService: func.isRequired
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
            isLogin={ this.isUserLogin() }
            onClickLogoutBtn={ this.signOutFlassService } />

          <Content>
            <Lecture
              lectureIdFromLink={ parseInt(id) }
            />
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

  @autobind
  signOutFlassService() {
    this.props.signOutFlassService();
  }
}

FlassViewComponent.childContextTypes = childContextTypes;
FlassViewComponent.propTypes = propTypes;
FlassViewComponent.defaultProps = defaultProps;

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signOutFlassService: signActions.logout
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassViewComponent);
