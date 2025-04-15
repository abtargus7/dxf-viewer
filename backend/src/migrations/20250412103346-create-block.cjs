'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('block', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      fileId: {
        type: Sequelize.UUID,
        references: {
          model: "file",
          key: "id"
        },
      },
      name: {
        type: Sequelize.STRING
      },
      positionX: {
        type: Sequelize.FLOAT
      },
      positionY: {
        type: Sequelize.FLOAT
      },
      positionZ: {
        type: Sequelize.FLOAT
      },
      handle: {
        type: Sequelize.STRING
      },
      ownerHandle: {
        type: Sequelize.STRING
      },
      name2: {
        type: Sequelize.STRING
      },
      xrefPath: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('block');
  }
};