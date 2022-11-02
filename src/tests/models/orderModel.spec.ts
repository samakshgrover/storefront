import { OrderStore } from "../../models/orderModel";

const store = new OrderStore();

describe('Order Model', () => {
  it('Add Order', () => {
    expect(store.addOrder).toBeDefined()
  })

  it('Index Orders', () => {
    expect(store.index).toBeDefined()
  })

  it('Remove Order', () => {
    expect(store.removeOrder).toBeDefined()
  })

  it('Add Products', () => {
    expect(store.addProducts).toBeDefined()
  })
})