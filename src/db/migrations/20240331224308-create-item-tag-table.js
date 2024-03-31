'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('item_tag',{
      item_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        references:{
          model:'items',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      tag_id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        references:{
          model:'tags',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'

      },
      created_at:{
        type: Sequelize.DATE,
        
      },
      updated_at:{
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('item_tag')
  }
};