'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {


    await queryInterface.addColumn("users", "image", { type: DataTypes.STRING, allowNull: true },)

  },

  down: async (queryInterface, DataTypes) => {

    await queryInterface.removeColumn('users', "image");

  }
};
