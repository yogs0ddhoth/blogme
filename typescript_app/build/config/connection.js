"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const db_config_1 = require("./db.config");
let sequelize;
if (process.env.JAWSDB_URL) {
    sequelize = new sequelize_typescript_1.Sequelize(process.env.JAWSDB_URL);
}
else {
    sequelize = new sequelize_typescript_1.Sequelize(db_config_1.DB, db_config_1.USER, db_config_1.PASSWORD, {
        host: db_config_1.HOST,
        dialect: 'mysql',
        port: 3306,
        // models: [__dirname + '/**/*.model.ts']
    });
}
exports.default = sequelize;
