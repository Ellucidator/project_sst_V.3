'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('adresses', {
      user_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      zip_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      state: {
        type: Sequelize.CHAR(3),
        allowNull: false
      },
      city: {
        type: Sequelize.CHAR(100),
        allowNull: false
      },
      neighborhood: {
        type: Sequelize.CHAR(100),
        allowNull: false
      },
      street: {
        type: Sequelize.CHAR(100),
        allowNull: false
      },
      house_number: {
        type: Sequelize.CHAR(10),
        defaultValue: "S/N",
        allowNull: true
      },
      complement: {
        type: Sequelize.CHAR(15),
        allowNull: true
      },
      reference_point: {
        type: Sequelize.CHAR(100),
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('adresses')
  }
};