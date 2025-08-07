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
    await queryInterface.createTable("tbl_user_refresh_tokens", {
      uid_user_refresh_token: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      uid_usuarios: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: "tbl_usuarios",
          key: "uid_usuarios",
        },
        onDelete: "CASCADE",
      },
      refresh_token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      user_agent: {
        type: Sequelize.STRING(255),
        allowNull: true, // Opcional, mas explícito
      },

      ip_address: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },

      expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("tbl_user_refresh_tokens");
  },
};
