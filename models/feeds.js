"use strict";
module.exports = (sequelize, DataTypes) => {
    const feeds = sequelize.define(
        "feeds",
        {
            status: DataTypes.TEXT,
            userId: DataTypes.INTEGER
        },
        {}
    );
    feeds.associate = function(models) {
        feeds.belongsTo(models.users, { foreignKey: "userId", as: "user" });
    };
    return feeds;
};
