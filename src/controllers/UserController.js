const { User } = require("../models")
const config = require("../config/config")
const util = require("../util")

module.exports = redis => ({
  async createUser(req, res) {
    try {
      const address = req.body.address
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      if (user) {
        //Cache this user
        redis.hset(
          util.keyRootPair(util.keyRootPair, address),
          "timestamp",
          util.convertDateToTimeStamp(new Date())
        )
      }
      res.status(200).send({
        user: userJson
      })
    } catch (err) {
      res.status(400).send({
        error: "This account already exists"
      })
    }
  },
  async fetchUser(req, res) {
    try {
      const { address } = req.body
      const user = await User.findOne({
        where: {
          address: address
        }
      })

      if (!user) {
        return res.status(403).send({
          error: "The account information was incorrect"
        })
      }

      const userJson = user.toJSON()
      res.status(200).send({
        user: userJson
      })
    } catch (error) {
      res.status(500).send({
        error: "An error has occurred retrieving your account information"
      })
    }
  }
})
