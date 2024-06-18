'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull: false
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      description:{
        type: Sequelize.STRING,
        allowNull: true
      },
      price:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      in_stock:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      featured:{
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      promotion:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      thumbnail_url:{
        type: Sequelize.STRING,
        allowNull: true
      },
      bucket:{
        type: Sequelize.STRING,
        allowNull: true
      },
      mime:{
        type: Sequelize.STRING,
        allowNull: true
      },
      size:{
        type: Sequelize.FLOAT,
        allowNull: true
      },
      images:{
        type: Sequelize.JSONB,
        allowNull: true
      },
      sub_category_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'sub_categories',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'RESTRICT'
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
    await queryInterface.dropTable('items');
  }
};
