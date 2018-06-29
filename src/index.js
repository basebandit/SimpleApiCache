const express = require("express")
const bodyParser = require("body-parser")
const redis = require("redis")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const { sequelize } = require("./models")
const config = require("./config/config")

const redisClient = redis.createClient(
  config.db.redis.port,
  config.db.redis.host
)

const app = express()

app.use(helmet())
app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(cors())

redisClient.on("connect", () => {
  console.log(`Connected to redis`)
  require("./routes")(app, redisClient)
  sequelize
    .sync()
    .then(() => {
      app.listen(config.port)
      console.log(`Server started on port ${config.port}`)
    })
    .catch(err => {
      console.log(err)
    })
})
redisClient.on("error", err => {
  console.log(err)
})
