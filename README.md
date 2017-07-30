
This is a pure [Ruby on Rails](http://rubyonrails.org/) / [React](https://facebook.github.io/react/) / [Redux](https://github.com/reactjs/redux) / [Webpack 2](https://webpack.github.io/) boilerplate app.

## Features

- Ruby on Rails 5.1.1
- React 15.5.x
- Webpack 2.x
- Babel 6.x
- ESLint support
- SASS and StyleLint support
- Hashed filenames for production assets
- Separate app and vendor JS bundles
- Using Rails default gems and NPM packages only

## Exit Asset Pipeline, Enter Webpack

Why Webpack?  
Webpack is a module bundler. It can bundle all JS files for usage in the browser, but can also transform / bundle / package any resource or frontend asset.  
The [NPM](https://www.npmjs.com/) ecosystem is huge, and Webpack makes it available in the simplest way possible.  
Webpack can support every modern JS app, using ES6 or CommonJS modules, or both, create a single or multiple bundles, and in general can be customized to accomplish any application requirement. 

The frontend assets on this repository are placed on a more accessible directory, at `front/js` and `front/css`, rather than `app/assets/javascripts` and `app/assets/stylesheets`.  
At any point, migration to a different backend (for example NodeJS) can be seamless since Webpack is running as a stand-alone bundler, there's absolutely no dependence to the Asset Pipeline or any other framework-specific module.  

## Install

It's recommended to use Ruby 2.3.x and NodeJS 6.10.x.

```sh
# install bundler if not available
gem install bundler

# install gem dependencies
bundle install

# install npm dependencies
npm install

# create the postgres databases
# update config/database.yml details if needed
rake db:create

# generate assets for development
npm run webpack

# start server
rails s
```

## Webpack scripts

`npm run webpack`  
Builds the assets for development mode.

`npm run webpack-watch`  
Builds the assets for development mode, and rebuilds on every detected change.

`npm run webpack-production`  
Builds the assets for production mode, output files are hashed.

`webpack-dev-server`
클라이언트 단만 실행.

## Load assets in production from a custom root directory or URL

By default JS/CSS assets are being served from the `public/` directory. 
However in production it may be needed to serve assets from a CDN or an S3 bucket etc.  
Simply override the `Rails.application.config.assets.root_path` property on the production environment to accomplish it.  
Of course during the deployment script and after the `npm run webpack-production` command, `public/*` output files should be copied to the target dir or infrastructure.

## Library
- redux-saga, thunk : saga는 수월하게 액션 묶음을 동기적으로 처리하기 위함. 
https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
- redux-form 
http://redux-form.com/7.0.1/docs/GettingStarted.md/
- fetch api : axios - 다른 API과 다르게 cancelable 방법을 제시해주고 있음. 
https://medium.com/little-big-programming/%EB%82%B4%EA%B0%80-fetch-api%EB%A5%BC-%EC%93%B0%EC%A7%80-%EB%AA%BB%ED%96%88%EB%8D%98-%EC%9D%B4%EC%9C%A0-3c23f0ec6b82
- lodash : 함수형 작성에 있어 서포트해주는 라이브러리
- material-ui : 가장 인지도 있는 material ui 라이브러리.
https://www.vobour.com/book/view/LCETueEN7i3MjvEcz
- moment : 날짜 조작 관련 라이브러리
- chart.js : 그래프 라이브러리

## for test
https://medium.com/@sangboaklee/react-%ED%85%8C%EC%8A%A4%ED%8C%85-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0-1c3719cee5af

