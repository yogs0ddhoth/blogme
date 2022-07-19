"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOST = exports.PASSWORD = exports.USER = exports.DB = void 0;
// module.exports = {
//   HOST: "us-cdbr-east-05.cleardb.net",
//   USER: "b32ee77ece0dcc",
//   PASSWORD: "4225651c",
//   DB: "heroku_8c59a616683e72e"
// };
require('dotenv').config();
exports.DB = process.env.DB_NAME;
exports.USER = process.env.DB_USER;
exports.PASSWORD = process.env.DB_PASSWORD;
exports.HOST = 'localhost';
