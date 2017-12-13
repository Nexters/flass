import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  LOGIN_GOOGLE_SERVICE
} from '../../../../modules/Sign/signs';
import Google from '../../../../modules/Google';

const propTypes = {
  goToAuthPage: PropTypes.func.isRequired
};

const defaultProps = {};

class WithGoogleSignComponent extends Component {
  componentDidMount() {}

  onClickLoginBtn = () => {
    this.props.goToAuthPage();
  };

  render() {
    const WrappedComponent = this.props.component;
    if (Google.isAuthorized()) {
      return <WrappedComponent { ...this.props } />;
    }
    return (
      <div>
        <a
          className="signInButton"
          onClick={ this.onClickLoginBtn }>
          <div className="signInButtonContent">
            <img
              className="googleIcon"
              src="http://i.imgur.com/6TVkeNz.png"
              alt="Classting 아이콘" />
            Log in with Google
          </div>
        </a>
      </div>
    );
  }
}

WithGoogleSignComponent.propTypes = propTypes;
WithGoogleSignComponent.defaultProps = defaultProps;

const WithConnect = connect(state => ({
}), {
  goToAuthPage: () => ({
    type: LOGIN_GOOGLE_SERVICE
  })
})(WithGoogleSignComponent);

export default options =>
  WrappedComponent => (props => (<WithConnect
    { ...props }
    component={ WrappedComponent }
    options={ options } />));
