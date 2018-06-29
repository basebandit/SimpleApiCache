module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    address: {
      type: DataTypes.STRING,
      unique: true
    },
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING
  })
  return User
}
