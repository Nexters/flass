FROM ruby:2.4

# Node.js
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs

WORKDIR /user/src/app
ADD . /user/src/app

RUN npm i
RUN npm rebuild node-sass --force
RUN npm run webpack
RUN gem install bundler
RUN bundle install
RUN rake db:create
EXPOSE 80
CMD ["rails" "s"]