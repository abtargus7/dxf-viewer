'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entity', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      blockId: {
        type: Sequelize.UUID,
        references: {
          model: "block",
          key: "id"
        },
      },
      type: {
        type: Sequelize.STRING
      },
      coOrdinates: {
        type: Sequelize.JSONB
      },
      handle: {
        type: Sequelize.STRING
      },
      ownerHandle: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.INTEGER
      },
      colorIndex: {
        type: Sequelize.INTEGER
      },
      shape: {
        type: Sequelize.BOOLEAN
      },
      normalVector: {
        type: Sequelize.JSONB
      },
      degreeOfSplineCurve: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('entity');
  }
};