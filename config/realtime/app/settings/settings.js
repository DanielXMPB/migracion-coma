module.exports = {
  env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  dev: process.env.NODE_ENV !== 'production',
  host: '0.0.0.0',
  port: process.env.PORT || 41236,
  mysql: {
    host: 'db_ffm',
    port: 3306,
    db: 'diamante_test',
    user: 'root',
    pass: '1234',
  },
  session: {
    name: 'appsession',
    secret: '1234567890',
  },
  signature: 'rDp+KupvV+_BJeEpCMp+!ny9ncSmkwx-F_gmcH2jtxQN7rqz4QF#TGWBSsaK3mWs',
  testToken: 'realtime-testing',
};
