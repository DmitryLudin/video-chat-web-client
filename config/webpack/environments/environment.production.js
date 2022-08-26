/**
 * Конфиг для прода
 * Важно кавычки - вместе сперва двойные, потом одинарные.
 */
const baseEnv = require('./base-environment');

const prodEnv = {
  ...baseEnv,
  ENV: "'prod'",
  PLATFORM: "'web'",
  API_HOST: "'https://lampa-kharon.query.consul-prod'",
  APP_HOST: "'https://lampa-kharon.query.consul-prod'",
  WS_HOST: "'wss://digital-hr.tochka.com'",
  OauthConfigs: {
    requestParams: {
      host: "'https://auth.tochka-tech.com'",
      client_id: "'e3e4eb9c'",
      redirect_uri: "'https://digital-hr.tochka.com/authorization/oauth'"
    }
  },
  matomo: {
    url: "'//analytics.tochka-tech.com/'",
    siteId: 12,
    customDimensions: {
      details: 1,
      sessionId: 2
    }
  }
};

module.exports = prodEnv;
