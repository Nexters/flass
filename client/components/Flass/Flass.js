import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import FlassDrawer from './FlassDrawer';
import FlassUserAppBar from './FlassUserAppBar';
import FlassGrid from './FlassGrid';
import './Flass.scss';

const propTypes = {};
const defaultProps = {};

class Flass extends Component {
  componentDidMount() {
  }
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  render() {
    return (
      <div>
        <AppBar
          className="flass-app-bar"
          showMenuIconButton={ false }
          title="Flass"
          titleStyle={ { paddingTop: 10, paddingLeft: 3 } }
          iconElementRight={ <FlassUserAppBar /> } />
        <FlassGrid />
        <FlassDrawer />
      </div>
    );
  }
}
Flass.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
Flass.propTypes = propTypes;
Flass.defaultProps = defaultProps;

export default Flass;
