import pool from "../db";

export class OrderStore {
  async addOrder(userId: number | string) {
    const client = await pool.connect();
    try {
      const sql = `insert into orders (user_id, status) values ($1, 'active') returning *`;
      const { rows } = await client.query(sql, [userId]);
      return rows;
    } catch (err) {
      throw new Error(`Error while creating order, Error: ${err}`);
    } finally {
      client.release();
    }
  }

  async index() {
    const client = await pool.connect();
    try {
      const sql = `select * from orders`;
      const { rows } = await client.query(sql);
      return rows;
    } catch (err) {
      throw new Error(`Error while getting all orders ${err}`);
    } finally {
      client.release();
    }
  }

  async removeOrder(orderId: string | number) {
    const client = await pool.connect();
    try {
      const sql = `delete from orders where order_id = $1`;
      const { rows } = await client.query(sql, [orderId]);
      return rows;
    } catch (err) {
      throw new Error(`Error while creating order, Error: ${err}`);
    } finally {
      client.release();
    }
  }

  async addProducts(orderId: string | number, productId: string | number, quantity: string | number) {
    const client = await pool.connect();
    try {
      const sql = `insert into ordered_products (order_id, product_id, quantity) values ($1, $2, $3) returning *`;
      const { rows } = await client.query(sql, [orderId, productId, quantity]);
      return rows;
    } catch (err) {
      throw new Error(`Error while creating order, Error: ${err}`);
    } finally {
      client.release();
    }
  }
}
