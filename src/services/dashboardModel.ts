import pool from "../db";

export class DashboardStore {
  async currentOrderByUser(userId: string | number) {
    const client = await pool.connect();
    try {
      const sql = `
      select 
        p.name, p.price, op.quantity, o.order_id
      from 
        orders o
      inner join
        ordered_products op
      on
        o.order_id = op.order_id
      inner join
        products p
      on 
        p.product_id = op.product_id
      where 
        o.status = 'active'
      and
        o.user_id = $1
      `;
      const { rows } = await client.query(sql, [userId]);
      return rows;
    } catch (err) {
      throw new Error(`Error while creating order, Error: ${err}`);
    } finally {
      client.release();
    }
  }

  async completedOrdersByUser(userId: string | number) {
    const client = await pool.connect();
    try {
      const sql = `
      select 
        p.name, p.price, op.quantity, o.order_id
      from 
        orders o
      inner join
        ordered_products op
      on
        o.order_id = op.order_id
      inner join
        products p
      on 
        p.product_id = op.product_id
      where 
        o.status = 'complete'
      and
        o.user_id = $1
      `;
      const { rows } = await client.query(sql, [userId]);
      return rows;
    } catch (err) {
      throw new Error(`Error while creating order, Error: ${err}`);
    } finally {
      client.release();
    }
  }

  async top5Products() {
    const client = await pool.connect();
    try {
      const sql = `
        select 
          p.name, p.price
        from 
          products p
        inner join
          ordered_products op
        on 
          op.product_id = p.product_id
        group by
          p.product_id
        order by
          count(quantity) desc
        limit 5
      `;
      const { rows } = await client.query(sql);
      return rows;
    } catch (err) {
      throw new Error(`Error while finding top 5 products, Error: ${err}`);
    } finally {
      client.release();
    }
  }

}
