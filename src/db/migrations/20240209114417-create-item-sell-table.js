'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('items_sell', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      item_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'items',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'users',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
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
    await queryInterface.dropTable('items_sell');
  }
};
