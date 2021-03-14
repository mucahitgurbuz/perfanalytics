import { Sequelize } from 'sequelize-typescript';
import path from 'path';

import configuration from './../server-config.json';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  operatorsAliases: Sequelize.Op as any,
  database: configuration.database.dbName,
  username: configuration.database.userName,
  password: configuration.database.password,
  host: configuration.database.url,
  port: parseInt(configuration.database.port, 10),
  dialectOptions: {
    decimalNumbers: true
  },
  modelPaths: [path.resolve(__dirname, '..', 'models')]
});