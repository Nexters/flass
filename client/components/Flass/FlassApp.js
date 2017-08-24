import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cyan500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { Route, Switch } from 'react-router-dom';

import requireSession from '../HOC/requireSession';
import Grid from './Grid/GridContainer';
import Detail from './Detail/DetailContainer';
import Upload from '../Upload';
import Drawer from './Drawer/Drawer';
import Content from './Content';
import './FlassApp.scss';
import AppBar from './AppBar/AppBar';

const childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
const propTypes = {
  id: PropTypes.number.isRequired,
  fetchUser: PropTypes.func.isRequired
};

const defaultProps = {};

const flassTheme = getMuiTheme({
  palette: {
    textColor: cyan500
  },
  appBar: {
    height: 40
  }
});

class FlassApp extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentDidMount() {
    this.props.fetchUser('token');
  }

  render() {
    const { id } = this.props;

    return (
      <MuiThemeProvider muiTheme={ flassTheme }>
        <div>
          <Drawer />
          <AppBar isLogin={id !== -1} />

          <Content>
            {this.renderContent()}
          </Content>
        </div>
      </MuiThemeProvider>
    );
  }

  renderContent() {
    return (
      <Switch>
        <Route exact path="/" component={ requireSession(Grid) } />
        <Route path="/home" component={ requireSession(Grid) } />
        <Route path="/detail/:id" component={ requireSession(Detail) } />
        <Route path="/upload" component={ requireSession(Upload) } />
      </Switch>
    );
  }
}

FlassApp.childContextTypes = childContextTypes;
FlassApp.propTypes = propTypes;
FlassApp.defaultProps = defaultProps;

export default FlassApp;
