import postgres from "postgres"
import { DATABASE_DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USER } from "../configs"

const sql = postgres({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_DATABASE,
}) // will use psql environment variables

export default sql
