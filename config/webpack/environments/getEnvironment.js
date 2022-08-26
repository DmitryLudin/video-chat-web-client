require('dotenv').config();

function getEnvironment() {
  const NODE_ENV = process.env.NODE_ENV || 'local';

  let environment;

  try {
    environment = require(`./environment.${NODE_ENV}.js`);
  } catch (ex) {
    console.error(ex);
    environment = {};
  }

  return environment;
}

module.exports = getEnvironment;
