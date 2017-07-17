import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import FlassApp from './Flass/FlassApp';
import FlassGrid from './Flass/FlassGrid/FlassGrid';
import VideoComponent from './Video/VideoComponent';
import FlassDetail from './Flass/FlassDetail/FlassDetail';
import Upload from './Upload';

class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <FlassApp>
          <Switch>
            <Route exact path="/" component={ FlassGrid } />
            <Route path="/channel/me" component={ FlassGrid } />
            <Route path="/detail/:id" component={ FlassDetail } />
            <Route path="/video" component={ VideoComponent } />
            <Route path="/upload" component={ Upload } />
          </Switch>
        </FlassApp>
      </BrowserRouter>
    );
  }
}

export default Root;
