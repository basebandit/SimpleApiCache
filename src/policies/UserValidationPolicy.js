const Joi = require("joi")

module.exports = {
  createUser(req, res, next) {
    /**
     * Insert Your Validations Here
     */
    const schema = {
      address: Joi.string(),
      firstName: Joi.string(),
      middleName: Joi.string(),
      lastName: Joi.string()
    }

    const { error, value } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case "address":
          res.status(400).send({
            error: "Invalid address format"
          })
          break
        case "firstName":
          res.status(400).send({
            error: "Unacceptable characters in name"
          })
          break
        case "middleName":
          res.status(400).send({
            error: "Unacceptable characters in name"
          })
          break
        case "lastName":
          res.status(400).send({
            error: "Unacceptable characters in name"
          })
          break
      }
    } else {
      next()
    }
  }
}
