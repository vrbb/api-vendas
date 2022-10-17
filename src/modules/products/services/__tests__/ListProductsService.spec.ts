import ListProductsService from '../ListProductsService';

describe('Create User Service', () => {
  it('Should be able to create a new user', async () => {
    const listProducts = new ListProductsService();

    const response = await listProducts.execute();
    expect(response).toBeDefined();
  });
});
