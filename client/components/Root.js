import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import FlassApp from './Flass/FlassApp';
// import Flass from './Flass/Flass';
import FlassGrid from './Flass/FlassGrid';
import VideoComponent from './Video/VideoComponent';

class Root extends Component {
  render() {
    return (
      <FlassApp>
        <BrowserRouter>
          <main>
            <Switch>
              <Route exact path="/" component={ FlassGrid } />
              <Route path="/video" component={ VideoComponent } />
            </Switch>
          </main>
        </BrowserRouter>
      </FlassApp>
    );
  }
}

export default Root;
