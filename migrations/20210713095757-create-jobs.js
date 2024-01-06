'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jobTitle: {
        type: Sequelize.STRING
      },
      recruiter: {
        type: Sequelize.STRING
      },
      client: {
        type: Sequelize.STRING
      },
      accountManager: {
        type: Sequelize.STRING
      },
      jobLocation: {
        type: Sequelize.STRING
      },
      jobType: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.INTEGER
      },
      numberOfPosition: {
        type: Sequelize.INTEGER
      },
      zipCode: {
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.STRING
      },
      endClient: {
        type: Sequelize.STRING
      },
      hourlyRate: {
        type: Sequelize.STRING
      },
      salary: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jobs');
  }
};