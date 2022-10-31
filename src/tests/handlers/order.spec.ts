import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe('Order handler', () => {
  let token: string, userId: number, productId: number | string,
    category: string | null, orderId: string | number

  beforeAll(async () => {
    const userData = {
      username: "orderTestUser",
      first_name: "Order",
      last_name: "Tester",
      password: "password123"
    }

    const productData = {
      name: "leather ball",
      price: 10,
      category: 'sports'
    }

    const { body } = await request
      .post("/users")
      .send(userData)

    token = body.token;
    userId = body.userId;

    const res = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(productData)

    productId = res.body.result.product_id;
    category = res.body.result.category;
  })

  it('Adding order', async () => {
    const res = await request
      .post(`/orders/${userId}`)
      .set('Authorization', `Bearer ${token}`)
    orderId = res.body.result.order_id;
    expect(res.status).toBe(200);
  })

  it('getting all orders', async () => {
    const res = await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
  })

  it('adding products to order', async () => {
    const res = await request
      .post(`/orders/${orderId}/products`)
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 5 });

    expect(res.status).toBe(200)
  })
})