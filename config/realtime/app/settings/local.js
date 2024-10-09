module.exports = {
  port: 41236,
  mysql: {
    host: 'db_ffm',
    port: '3306',
    db: 'diamante_eisi',
    user: process.env.DB_SQL_USER,
    pass: process.env.DB_SQL_PASSWORD,
  },
};
