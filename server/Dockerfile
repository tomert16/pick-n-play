# start from the base
FROM ruby:2.7.4

# set a directory for the app
WORKDIR /server

# Copy Gemfile and Gemfile.lock files
COPY Gemfile Gemfile.lock ./

# install ruby gems
RUN bundle install --quiet

#copy all the files to the container
COPY . ./

# add a script to be executed when the container starts
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT [ "entrypoint.sh" ]

# export port
EXPOSE 3000

# start app
CMD ["rails", "s", "-p", "3000", "-b", "0.0.0.0"]