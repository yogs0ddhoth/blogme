const Sequelize = require('sequelize');
require('dotenv').config();
const{ HOST, USER, PASSWORD, DB } = require('./db.config'); 

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
      host: HOST,
      dialect: 'mysql',
      // port: 3306
    }
  );
}

module.exports = sequelize;
