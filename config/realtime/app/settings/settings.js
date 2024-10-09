module.exports = {
  env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  dev: process.env.NODE_ENV !== 'production',
  host: '0.0.0.0',
  port: process.env.PORT || 41236,
  mysql: {
    host: 'db_ffm',
    port: 3306,
    db: 'diamante_test',
    user: process.env.DB_SQL_USER,
    pass: process.env.DB_SQL_PASSWORD,
  },
  session: {
    name: 'appsession',
    secret: '1234567890',
  },
  signature: process.env.COMA_REALTIME_KEY,
  testToken: 'realtime-testing',
};
