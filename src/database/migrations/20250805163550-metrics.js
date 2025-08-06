"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("tbl_medidas", {
      uid_medidas: {
        type: Sequelize.STRING(36),
        primaryKey: true,
        allowNull: false,
      },
      uid_usuarios: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING(36),
      },
      busto: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      torax: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      cintura: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      quadril: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      coxa: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      calcado: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("tbl_medidas");
  },
};
