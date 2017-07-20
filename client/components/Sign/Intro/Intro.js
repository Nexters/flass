import React from 'react';
import PropTypes from 'prop-types';
import './Intro.scss';

const propTypes = {};

const defaultProps = {};

const Intro = () => (
  <div className="sign-intro">
    <div className="sign-intro-title">
      <h1>Flass</h1>
      <p>Better interaction, better learning</p>
      <p>플래스를 통해 플립러닝을 실현하세요.</p>
    </div>
  </div>
);

Intro.propTypes = propTypes;
Intro.defaultProps = defaultProps;

export default Intro;
