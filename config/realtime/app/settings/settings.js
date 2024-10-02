module.exports = {
  env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  dev: process.env.NODE_ENV !== 'production',
  host: '0.0.0.0',
  port: process.env.PORT || 41236,
  mysql: {
    host: process.env.DB_DNS,
    port: 3306,
    db: process.env.DIAMANTE_NAME,
    user: process.env.DB_SQL_USER_FILE,
    pass: process.env.DB_SQL_PASSWORD_FILE,
  },
  session: {
    name: 'appsession',
    secret: '1234567890',
  },
  signature: process.env.COMA_REALTIME_KEY_FILE,
  testToken: 'realtime-testing',
};
