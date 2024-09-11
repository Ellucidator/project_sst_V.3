'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('item_characteristics',{
      item_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        references:{
          model:'items',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      width:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      height:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      length:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      weight:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      insurance_value:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull:true
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
    await queryInterface.dropTable('item_characteristics')
  }
};
