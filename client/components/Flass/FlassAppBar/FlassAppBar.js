import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlassUserAppBar from './FlassUserAppBar';
import './FlassAppBar.scss';

const propTypes = {
  isLogin: PropTypes.bool,
};

const defaultProps = {
  isLogin: false,
};

class FlassAppBar extends Component {
  componentDidMount() {}

  render() {
    const { isLogin } = this.props;

    return (
      <AppBar
        className="flass-app-bar"
        showMenuIconButton={ false }
        title={ <a href="/" className="flass-app-bar-title">Flass</a> }
        titleStyle={ { paddingTop: 10, paddingLeft: 3 } }
        iconElementRight={ isLogin ? <FlassUserAppBar /> : '' } />
    );
  }
}

FlassAppBar.propTypes = propTypes;
FlassAppBar.defaultProps = defaultProps;

export default FlassAppBar;
