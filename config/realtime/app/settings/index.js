const settings = require('./settings');
const production = require('./production');
const { databaseHeader } = require('./middleware');

let local;
try {
  local = require('./local');
} catch (e) {
  local = {};
}

if (settings.env === 'production') {
  if (databaseHeaderValue) {
    const database = production[databaseHeader];
    if (database) {
      Object.assign(settings, { mysql: specifidatabasecProduction });
    }
  }
}

Object.assign(settings, local);

module.exports = settings;
