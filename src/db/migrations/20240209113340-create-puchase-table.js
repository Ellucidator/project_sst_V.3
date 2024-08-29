'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('purchases', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
      address_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'adresses',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      payment_type:{
        type: Sequelize.ENUM('ticket', 'credit_card','debit_card','bank_transfer','atm','prepaid_card','digital_currency','digital_wallet','voucher_card','crypto_transfer'),
        allowNull: true
      },
      payment_status:{
        type: Sequelize.ENUM('pending', 'approved','authorized','in_process','in_mediation','rejected','cancelled','refunded','charged_back'),
        allowNull: true,
      },
      payment_id:{
        type: Sequelize.STRING,
        allowNull: true
      },
      all_value:{
        type: Sequelize.FLOAT,
        allowNull: true
      },
      status:{
        type: Sequelize.ENUM('Recebido', 'Transportadora', 'Enviado', 'Entregue','Cancelado'),
        allowNull: true,
        defaultValue: 'Recebido'
      },
      frete:{
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('purchases');
  }
};
