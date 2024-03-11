'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('items_promotion', {
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
        unique:true,
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      promotion_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'promotions',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      price:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      description:{
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('items_promotion');
  }
};
