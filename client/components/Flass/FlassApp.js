import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import autobind from 'autobind-decorator';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import Drawer from '../FlassCommon/Drawer/Drawer';
import Content from '../FlassCommon/Content';
import AppBar from '../FlassCommon/AppBar/AppBar';
import './FlassApp.scss';
import { FETCH_USER } from '~/ducks/Flass/users';
import { LOGOUT } from '~/ducks/Sign/signs';

const Grid = Loadable({
  loader: () => import('./Grid/Grid'),
  loading() {
    return <div>Loading...</div>;
  }
});

const Lecture = Loadable({
  loader: () => import('./Lecture/Lecture'),
  loading() {
    return <div>Loading...</div>;
  }
});

const Upload = Loadable({
  loader: () => import('./Upload'),
  loading() {
    return <div>Loading...</div>;
  }
});

const FlassAppBox = styled.div`
  height: 100%;
`;

const { func, number, object } = PropTypes;

const propTypes = {
  signOutFlassService: func.isRequired,
  id: number.isRequired
};

const defaultProps = {};


class FlassApp extends Component {
  render() {
    return (
      <FlassAppBox>
        <Drawer />
        <AppBar
          isLogin={this.isUserLogin()}
          onClickLogoutBtn={this.signOutFlassService} />
        <Content>
          {this.renderContent()}
        </Content>
      </FlassAppBox>
    );
  }

  renderContent() {
    return (
      <Switch>
        <Route exact path="/" component={Grid} />
        <Route exact path="/home" component={Grid} />
        <Route exact path="/lecture/:id" component={Lecture} />
        <Route exact path="/upload" component={Upload} />
        <Route path="/*" render={() => <Redirect to="/error" />} />
      </Switch>
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

FlassApp.propTypes = propTypes;
FlassApp.defaultProps = defaultProps;


function mapStateToProps(state) {
  return {
    ...state.flass.user,
    ...state.sign
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUser: () => ({
      type: FETCH_USER
    }),
    signOutFlassService: () => ({
      type: LOGOUT
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassApp);
