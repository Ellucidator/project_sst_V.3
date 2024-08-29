'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable('notifications_mp')
    
    await queryInterface.addColumn('purchases', 'payment_status', {
      type: Sequelize.ENUM('pending', 'approved','authorized','in_process','in_mediation','rejected','cancelled','refunded','charged_back'),
        allowNull: true,
    })
    await queryInterface.addColumn('purchases', 'payment_id', {
      type: Sequelize.STRING,
        allowNull: true,
    })
    await queryInterface.changeColumn('purchases', 'payment_type', {
      type: Sequelize.ENUM('ticket', 'credit_card','debit_card','bank_transfer','atm','prepaid_card','digital_currency','digital_wallet','voucher_card','crypto_transfer','account_money'),
        allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('purchases', 'payment_status')
    await queryInterface.removeColumn('purchases', 'payment_id')
  }
};
