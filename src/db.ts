import { Pool } from "pg";

const {
  PGHOST: host,
  PGUSER: user,
  PGPASSWORD: password,
  PGDATABASE: database,
} = process.env;

const pool = new Pool({
  host,
  database,
  user,
  password,
});

export default pool;
