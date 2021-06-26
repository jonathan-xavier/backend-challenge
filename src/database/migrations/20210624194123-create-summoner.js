'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('summoner', { 
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nickname:{
        type: Sequelize.STRING,
        allowNull: false,

      },
      account_id:{
        type: Sequelize.STRING,
        unique: true,

      },
      summoner_level:{
        type: Sequelize.INTEGER,

      },
      profile_icon_id:{
        type: Sequelize.INTEGER,
      },
      summoner_id:{
        type: Sequelize.INTEGER,
        unique: true,
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },



    });
     
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
