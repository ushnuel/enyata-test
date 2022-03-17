const Sequelize = require('sequelize');
const configureEnvironment = require('../config/environment');
configureEnvironment();
const database = require("../config/config").database;

class SequelizeClass {
  static init() {
    if (!this.initialized) {
      this.sequelize = new Sequelize(database.name, database.username, database.password, {
        dialect: 'postgres',
        host: database.host,
        dialectOptions: {
          useUtc: false,
        },
        timezone: '+01:00',
        pool: {
          max: 45,
          min: 0,
          acquire: 60000,
          idle: 10000,
          evict: 5000
        }
      });

      this.initialized = true;
    }

    return this.sequelize;
  }
}

module.exports = SequelizeClass.init();