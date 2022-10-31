import app from "../../server";
import supertest from "supertest";

const requset = supertest(app);

const userdata = {
  first_name: 'rachna',
  last_name: 'grover',
  username: 'heena',
  password: 'pass1234'
}

let token: string, userId: number | string

describe('testing route', () => {

  it('testing create', async () => {
    const res = await requset
      .post('/users')
      .send(userdata);
    token = res.body.token;
    userId = res.body.userId;
    expect(res.status).toBe(200)
  })


  it('testing token', async () => {
    const res = await requset
      .get('/users')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200);
  })

  it('testing token', async () => {
    const res = await requset
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200);
  })

  it('test delete route', async () => {
    const res = await requset
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(204)
  })

})