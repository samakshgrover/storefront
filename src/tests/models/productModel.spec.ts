import { ProductStore } from "../../models/productModel";

const store = new ProductStore();

describe('Product Model', () => {

  let productId: number | string

  it('create product', async () => {
    const res = await store.create('bolyball', 20, 'sports');
    productId = res.product_id;
    expect(res.name).toBe('bolyball')
  })

  it('Index products', async () => {
    const res = await store.index();
    expect(Array.isArray(res)).toBeTrue();
  })

  it('Show product', async () => {
    const res = await store.show(productId);
    expect(res.product_id).toBe(productId)
  })

})