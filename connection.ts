import { MYSQL_CONFIG } from "./config/config";
import {Sequelize} from 'sequelize-typescript'

import { log } from "wechaty";

export default async () => {
   try {
      let sequelize = new Sequelize({
         database: MYSQL_CONFIG.database,
         dialect: "mysql",
         username: MYSQL_CONFIG.username,
         password: MYSQL_CONFIG.password,
         storage: ':memory:',
         host:MYSQL_CONFIG.host,
         models: [__dirname + '/entity'], // or [Player, Team],
      });
      await sequelize.authenticate()
      log.info('mysql connection created')
   } catch (error) {
      throw error
   }
}
