import dotenv from 'dotenv'

dotenv.config()

export const {
  PORT,
  NODE_ENV,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE_NAME,
  JWT_SECRET,
} = process.env
