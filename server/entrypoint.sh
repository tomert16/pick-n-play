#! /bin/bash
set -e

#  Remove a potentially pre-existing server.pid for Rails 
rm -f /server/tmp/pids/server.pid

# execute the main process of the container
exec "$@"