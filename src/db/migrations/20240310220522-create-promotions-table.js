'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('promotions',{
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
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
      featured:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      thumbnail_url:{
        type: Sequelize.STRING,
        allowNull: true
      },
      bucket: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mime: {
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
    await queryInterface.dropTable('promotions');
  }
};
