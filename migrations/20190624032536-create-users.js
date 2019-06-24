module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(11)
            },
            name: {
                type: Sequelize.STRING(255)
            },
            avatar: {
                type: Sequelize.STRING(255)
            },
            email: {
                type: Sequelize.STRING(255)
            },
            phone_number: {
                type: Sequelize.STRING(15)
            },
            gender: {
                type: Sequelize.STRING(1)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW")
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW")
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("users");
    }
};
