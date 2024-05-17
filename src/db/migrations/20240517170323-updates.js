'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('purchases', 'status', {
      type: Sequelize.ENUM('Recebido', 'Transportadora', 'Enviado', 'Entregue','Cancelado'),
      allowNull: true,
      defaultValue: 'Recebido'
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('purchases', 'status')
  }
};
