const settings = require('./settings');
const session = require('./session');
const production = require('./production');

let local;
try {
  local = require('./local');
} catch (e) {
  local = {};
}

if (settings.env === 'production') {
  if (session.database) {
    const database = production[session.database];
    if (database) {
      Object.assign(settings, { mysql: database });
    }
  }
}

module.exports = settings;
