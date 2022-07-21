import { Sequelize } from 'sequelize-typescript';
import { HOST, USER, PASSWORD, DB } from './db.config'; 

let sequelize:Sequelize;

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
      port: 3306,
    }
  );
}

export default sequelize;
