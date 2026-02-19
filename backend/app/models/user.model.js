module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    // Optional fields (enable if needed)
    // address: {
    //   type: Sequelize.STRING
    // },

    // phone: {
    //   type: Sequelize.STRING
    // }
  });

  return User;
};
