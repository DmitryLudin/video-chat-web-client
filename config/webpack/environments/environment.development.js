/**
 * Конфиг для стейджа
 * Важно кавычки - вместе сперва двойные, потом одинарные.
 */
const baseEnv = require('./base-environment');

const stageEnv = {
  ...baseEnv,
  APP_HOST: "'http://localhost:3000'",
  API_HOST: "'http://localhost:8000'",
  WS_HOST: "'http://localhost:8000'",
};

module.exports = stageEnv;
