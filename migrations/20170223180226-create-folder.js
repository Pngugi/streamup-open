'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Folders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      size: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      folder_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
			freezeTableName: true // Model tableName will be the same as the model name
		});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Folders');
  }
};