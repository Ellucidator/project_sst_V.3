'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('company_information', {
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
      cnpj:{
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false
      },
      phone:{
        type: Sequelize.STRING,
        allowNull: false
      },
      phone_url:{
        type: Sequelize.STRING,
        allowNull: true
      },
      address:{
        type: Sequelize.STRING,
        allowNull: false
      },
      address_url:{
        type: Sequelize.STRING,
        allowNull: true
      },
      instagram_url:{
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
    await queryInterface.dropTable('company_information');
  }
};
