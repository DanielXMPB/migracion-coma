module.exports = {
  env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  dev: process.env.NODE_ENV !== 'production',
  host: '0.0.0.0',
  port: process.env.PORT || 41236,
  mysql: {
    host: 'db_ffm',
    port: 3306,
    db: 'diamante_eisi',
    user: 'root',
    pass: '1234',
  },
  signature: process.env.COMA_REALTIME_KEY,
  testToken: 'realtime-testing',
};
