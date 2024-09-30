module.exports = {
    port: 41236,
    mysql: {
        host: process.env.DB_DNS,
        port: 3306,
        db: process.env.DIAMANTE_NAME,
        user: process.env.DB_SQL_USER,
        pass: process.env.DB_SQL_PASSWORD
    },
};
