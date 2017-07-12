import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlassDrawer from './FlassDrawer';
import FlassUserAppBar from './FlassUserAppBar';
import FlassGrid from './FlassGrid';
import './Flass.scss';

const propTypes = {};
const defaultProps = {};

class Flass extends Component {
  componentDidMount() {
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

Flass.propTypes = propTypes;
Flass.defaultProps = defaultProps;

export default Flass;
