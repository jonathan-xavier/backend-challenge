'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'summoners',
      'userid',
      {
        type: Sequelize.INTEGER,
        refereces: { model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('summoners', 'userid');
    
  }
};
