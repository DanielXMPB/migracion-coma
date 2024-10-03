const fs = require('fs');

module.exports = {
    port: 41236,
    mysql: {
      host: process.env.DB_DNS,
      port: 3306,
      db: process.env.DIAMANTE_NAME,
      user: fs.readFileSync(process.env.DB_SQL_USER_FILE, 'utf8'),
      pass: fs.readFileSync(process.env.DB_SQL_PASSWORD_FILE, 'utf8')
    },
  };
  