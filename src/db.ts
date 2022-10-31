import dotenv from "dotenv"
import { ClientConfig, Pool } from "pg"

dotenv.config()

const config: ClientConfig = {
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
}

if (process.env.ENV === "test") {
  config.database = process.env.PGDATABASE_TEST
}

export default new Pool(config)
