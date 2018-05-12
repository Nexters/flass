import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Drawer from '~/components/FlassCommon/Drawer/Drawer';
import Content from '~/components/FlassCommon/Content';
import AppBar from '~/components/FlassCommon/AppBar/AppBar';
import Lecture from '../Lecture/Lecture';
import { LOGOUT } from '~/ducks/Sign/signs';

const {
  shape, string, object, number, func
} = PropTypes;

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
      <div>
        <Drawer />
        <AppBar
          isLogin={this.isUserLogin()}
          onClickLogoutBtn={this.signOutFlassService} />

        <Content>
          <Lecture
            lectureIdFromLink={parseInt(id)} />
        </Content>
      </div>
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

FlassViewComponent.propTypes = propTypes;
FlassViewComponent.defaultProps = defaultProps;

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signOutFlassService: () => ({
      type: LOGOUT
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassViewComponent);
