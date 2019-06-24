"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn("users", "password", Sequelize.STRING, {
            after: "email"
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("users", "password");
    }
};
