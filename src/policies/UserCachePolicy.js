const util = require("../util")

module.exports = redis => ({
  findUserFromCache(req, res, next) {
    console.log("user", req.body)
    const { address } = req.body
    redis.hgetall(util.keyRootPair(util.keyRoot, address), (err, user) => {
      if (err) {
        throw err //You can do better
      }
      if (user) {
        res.status(200).send({ user: JSON.stringify(user) })
      } else {
        next()
      }
    })
  }
})
