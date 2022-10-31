import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe('product handler', () => {
  const productData = {
    name: "CodeMaster 3000",
    price: 999,
    category: 'education'
  }

  let token: string, userId: number, productId: number, category: string

  beforeAll(async () => {

    const userData = {
      username: "produkttester",
      first_name: "Produkt",
      last_name: "Tester",
      password: "password123"
    }

    const { body } = await request
      .post("/users")
      .send(userData)

    token = body.token;
    userId = body.userId
  })

  it('create product', async () => {
    const res = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(productData)

    productId = res.body.result.product_id;
    category = res.body.result.category;
    expect(res.status).toBe(200);
  })

  it('index route', async () => {
    const res = await request.get('/products')
    expect(res.status).toBe(200)
  })

  it('show product route', async () => {
    const res = await request.get(`/products/${productId}`)
    expect(res.status).toBe(200)
  })

  it('product by category', async () => {
    const res = await request.get(`/products/category/${category}`);
    expect(res.status).toBe(200)
  })

  afterAll(async () => {
    await request.delete(`/users/${userId}`).set("Authorization", "bearer " + token)
  })
})