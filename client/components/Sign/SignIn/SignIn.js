import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FlatButton, RaisedButton, TextField } from 'material-ui';
import './SignIn.scss';

const propTypes = {};

const defaultProps = {};

class SignIn extends Component {

  componentDidMount() {}

  render() {
    return (
      <form>
        <h2>로그인</h2>
        <TextField
          className="signin-text"
          name="email"
          hintText="Email"
          floatingLabelText="이메일" />
        <br />
        <TextField
          className="signin-text"
          name="password"
          hintText="Password"
          floatingLabelText="비밀번호"
          type="password" />
        <Checkbox
          className="signin-checkbox"
          name="loginStatus"
          label="로그인 상태 유지" />
        <RaisedButton className="signin-submit" label="로그인" primary />
        <div className="signin-button-container">
          <FlatButton label="비밀번호 찾기" />
          <FlatButton label="회원 가입" />
        </div>
      </form>
    );
  }
}

SignIn.propTypes = propTypes;
SignIn.defaultProps = defaultProps;

export default SignIn;
