'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('photos', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      s3Key:{
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
      comment:{
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
    await queryInterface.dropTable('photos');
  }
};
