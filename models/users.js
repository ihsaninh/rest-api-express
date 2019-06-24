"use strict";
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        "users",
        {
            name: DataTypes.STRING,
            avatar: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            gender: DataTypes.STRING
        },
        {}
    );
    users.associate = function(models) {
        // associations can be defined here
    };
    return users;
};
