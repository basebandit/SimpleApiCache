const UserValidationPolicy = require("../policies/UserValidationPolicy")

module.exports = (app, redisClient) => {
  const UserController = require("../controllers/UserController")(redisClient)
  const UserCachePolicy = require("../policies/UserCachePolicy")(redisClient)
  app.post(
    "/create",
    UserValidationPolicy.createUser,
    UserController.createUser
  )
  app.post(
    "/fetch",
    UserCachePolicy.findUserFromCache,
    UserController.fetchUser
  )
}
