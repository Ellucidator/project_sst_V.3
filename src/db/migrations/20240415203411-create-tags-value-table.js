'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tags_value', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      value:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
      },
      tag_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'tags',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
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
    await queryInterface.dropTable('tags_value')
  }
};
