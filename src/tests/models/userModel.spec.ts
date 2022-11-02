import { UserStore } from "../../models/userModel";
import { makeHash } from '../../handlers/authHandler'

const store = new UserStore();

describe('User Model', () => {
  let userId: string | number

  it('index method', async () => {
    const res = await store.index();
    expect(Array.isArray(res)).toBeTrue();
  })

  it('create user', async () => {
    const hash = await makeHash("pass1234")
    const res = await store.create('samaksh', 'grover', 'grover', hash);
    userId = res.user_id;
    expect(res.username).toEqual("grover")
  })

  it('show user', async () => {
    const res = await store.show(userId);
    expect(res.user_id).toBe(userId)
  })

  it('delete user', async () => {
    const res = await store.deleteUser(userId)
    expect(res.user_id).toBe(userId)
  })

})