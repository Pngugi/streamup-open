'use strict';
module.exports = function(sequelize, DataTypes) {
  var Folder = sequelize.define('Folder', {
    size: DataTypes.STRING,
    type: DataTypes.STRING,
    folder_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Folder;
};