import pool from "../db";

interface User {
  user_id?: number,
  first_name: string;
  last_name: string;
  username: string;
  password_hash: string;
}

export class UserStore {
  async index() {
    const client = await pool.connect();
    try {
      const sql = `select * from users`;
      const { rows } = await client.query(sql);
      return rows;
    } catch (err) {
      throw new Error(`An Error found in userstore ${err}`)
    } finally {
      client.release();
    }
  }

  async create(firstName: string, lastName: string, username: string, passwordHash: string) {
    const client = await pool.connect();
    try {
      const sql = `insert into users (first_name, last_name, username, password_hash)
        values ($1, $2, $3, $4) returning *
      `;
      const { rows } = await client.query(sql, [
        firstName,
        lastName,
        username,
        passwordHash,
      ]);
      return rows[0];
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    }
  }

  async show(id: number): Promise<any[] | undefined> {
    const client = await pool.connect();
    try {
      const sql = `select * from users where user_id = $1`;
      const { rows } = await client.query(sql, [id]);
      return rows;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    }
  }

  async findUser(username: string) {
    const client = await pool.connect();
    try {
      const sql = `select * from users where username= $1`
      const { rows } = await client.query(sql, [username]);
      if (!rows.length) throw new Error(`no user with this ${username} username`)
      return rows[0];
    } catch (err) {
      throw new Error("filed to connect to database");
    } finally {
      client.release();
    }
  }

  async deleteUser(id: string | number) {
    const client = await pool.connect();
    try {
      const sql = `delete from users where user_id= $1`
      const { rows } = await client.query(sql, [id]);
      // if (!rows.length) throw new Error(`no user with this ${id} username`);
      return ;
    } catch (err) {
      throw new Error("filed to connect to database");
    } finally {
      client.release();
    }
  }

}
