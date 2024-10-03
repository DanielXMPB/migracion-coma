module.exports = {
    port: 41236,
    mysql: {
      host: process.env.DB_DNS,
      port: 3306,
      db: process.env.DIAMANTE_NAME,
      user: fs.readFileSync('/run/secrets/db_user', 'utf8'),
      pass: fs.readFileSync('/run/secrets/db_password', 'utf8')
    },
  };
  