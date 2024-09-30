import {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE_NAME,
} from '../../envConfig'
import sequelize, { Sequelize } from 'sequelize'

if (!DB_DATABASE_NAME || !DB_PASSWORD || !DB_USER) {
  // for testing
  console.log(`error in .env`)
  process.exit(1)
}
const dbName = String(DB_DATABASE_NAME)
const dbPass = String(DB_PASSWORD)
const dbUserName = String(DB_USER)

export const db = new Sequelize(dbName, dbUserName, dbPass, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
})
