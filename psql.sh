#!/bin/bash
export $( cat .env | xargs);
psql \
  --host=$POSTGRES_SERVER \
  --dbname=$POSTGRES_DATABASE \
  --username=$POSTGRES_USER \
  --password;

