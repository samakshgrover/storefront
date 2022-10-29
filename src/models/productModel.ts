import pool from "../db";

export class ProductStore {

  async index() {
    const client = await pool.connect();
    try {
      const sql = `select * from products`
      const { rows } = await client.query(sql);
      return rows;
    } catch (error) {
      throw new Error("Error connecting database")
    }
  }

  async create(name: string, price: number, category: string) {
    const client = await pool.connect();
    try {
      const sql = `
      insert into products (name, price, category)
      values ($1, $2, $3) returning *
      `
      const { rows } = await client.query(sql, [name, price, category])
      return rows
    } catch (err) {
      throw new Error("Error inserting into products")
    }
  }

  async show(id: number | string) {
    const client = await pool.connect();
    try {
      const sql = `select * from products where product_id = $1`
      const { rows } = await client.query(sql, [id]);
      return rows
    } catch (err) {
      throw new Error("Error while finding product in database")
    } finally {
      client.release();
    }
  }

  async productsByCategory(category: string) {
    const client = await pool.connect();
    try {
      const sql = `select * from products where category = $1`
      const { rows } = await client.query(sql, [category]);
      return rows
    } catch (err) {
      throw new Error("Error while finding product in database")
    } finally {
      client.release();
    }
  }

}