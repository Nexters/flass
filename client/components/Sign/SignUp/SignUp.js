import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, TextField } from 'material-ui';
import './SignUp.scss';

const propTypes = {};

const defaultProps = {};

class SignUp extends Component {
  componentDidMount() {}

  render() {
    return (
      <form>
        <h2>회원가입</h2>
        <TextField
          className="signup-text"
          name="email"
          hintText="Email"
          floatingLabelText="이메일" />
        <br />
        <TextField
          className="signup-text"
          name="username"
          hintText="username"
          floatingLabelText="닉네임" />
        <br />
        <TextField
          className="signup-text"
          name="password"
          hintText="password"
          floatingLabelText="비밀번호" />
        <br />
        <TextField
          className="signup-text"
          hintText="confirm password"
          floatingLabelText="비밀번호 확인" />
        <br />
        <RaisedButton
          className="signup-submit"
          label="회원 가입"
          primary />
      </form>
    );
  }
}

SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;

export default SignUp;
