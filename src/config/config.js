const path = require("path")

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    pgsql: {
      database: process.env.DB_NAME || "db_name",
      user: process.env.DB_USER || "db_user",
      password: process.env.DB_PASS || "db_password"
    },
    redis: {
      port: process.env.REDIS_PORT || 6379,
      host: process.env.HOST || "localhost"
    },
    options: {
      dialect: process.env.DIALECT || "postgres",
      host: process.env.HOST || "localhost",
      ssl: false,
      operatorsAliases: false
    }
  }
}
