#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    create role lorawan_as with login password 'lorawan_as';
    create database lorawan_as with owner lorawan_as;
EOSQL
