'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('items_tags_value', {
      item_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:{
          model:'items',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      tag_value_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:{
          model:'tags_value',
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
    await queryInterface.dropTable('items_tags_value')
  }
};
