FROM ruby:2.4

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs
RUN gem install rails -v 5.1.4

WORKDIR /user/src/app
ADD . /user/src/app

RUN npm install
RUN npm run webpack
RUN gem install bundler
RUN bundle install
RUN rake db:create
EXPOSE 80 443
CMD bundle exec rails s -p 443