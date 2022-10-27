/**
 * Конфиг для прода
 * Важно кавычки - вместе сперва двойные, потом одинарные.
 */
const baseEnv = require('./base-environment');

const prodEnv = {
  ...baseEnv,
  APP_HOST: "'http://localhost:3000'",
  API_HOST: "'http://62.84.122.93/api/'",
  WS_HOST: "'http://62.84.122.93'",
};

module.exports = prodEnv;
