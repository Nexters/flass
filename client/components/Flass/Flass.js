import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import SvgIcon from 'material-ui/SvgIcon';

import FlassDrawer from './FlassDrawer';
import './Flass.scss';
import FlassBadge from './FlassBadge';

import VideoComponent from '../Video/VideoComponent';

const propTypes = {};
const defaultProps = {};

const HomeIcon = props => (
  <SvgIcon { ...props }>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

const FlassUserAppBar = (<div>
  이름 <HomeIcon />
</div>);

const AppBarRight = (
  <div>
    <FlassBadge />
  </div>
);

class Flass extends Component {
  render() {
    return (
      <div>
        <AppBar
          showMenuIconButton={ false }
          title="Flass"
          titleStyle={ { paddingTop: 13, paddingLeft: 13 } }
          iconElementRight={ <FlassBadge /> } />
        <FlassDrawer />
        <VideoComponent />
      </div>
    );
  }
}

Flass.propTypes = propTypes;
Flass.defaultProps = defaultProps;

export default Flass;
