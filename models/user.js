module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [6,128]
      }
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,20]
      }
    },
    profileImage: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    }
  });

  User.associate = function(models) {
    // Associating a user with product
    // When a user is deleted, also delete any associated product(s)
    User.hasMany(models.Product, {
      onDelete: "cascade"
    });
  };

  return User;
};