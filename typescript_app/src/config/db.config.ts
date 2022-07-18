// module.exports = {
//   HOST: "us-cdbr-east-05.cleardb.net",
//   USER: "b32ee77ece0dcc",
//   PASSWORD: "4225651c",
//   DB: "heroku_8c59a616683e72e"
// };
require('dotenv').config();

export const DB = process.env.DB_NAME as string;
export const USER = process.env.DB_USER as string;
export const PASSWORD = process.env.DB_PASSWORD as string;

export const HOST = 'localhost';