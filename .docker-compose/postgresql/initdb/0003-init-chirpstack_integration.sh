#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    create role lorawan_integration with login password 'lorawan_integration';
    create database lorawan_integration with owner lorawan_integration;
EOSQL
