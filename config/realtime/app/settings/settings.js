module.exports = {
  env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  dev: process.env.NODE_ENV !== 'production',
  host: '0.0.0.0',
  port: process.env.PORT || 9700,
  mysql: {
    host: '127.0.0.1',
    port: 3306,
    db: 'diamante_test',
    user: 'root',
    pass: 'admin',
  },
  signature: process.env.COMA_REALTIME_KEY,
  testToken: 'realtime-testing',
};