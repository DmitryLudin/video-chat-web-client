/**
 * Конфиг для прода
 * Важно кавычки - вместе сперва двойные, потом одинарные.
 */
const baseEnv = require('./base-environment');

const prodEnv = {
  ...baseEnv,
  APP_HOST: "'http://localhost:3000'",
  API_HOST: "'https://api.ludind-video-conf.ru'",
  WS_HOST: "'https://api.ludind-video-conf.ru'",
};

module.exports = prodEnv;
