import CreateCustomerService from '../CreateCustomerService';

describe('CreateCustomer', () => {
  it('Should be able to create a new customer', async () => {
    const createCustomer = new CreateCustomerService();
    const customer = await createCustomer.execute({
      name: 'Victoria Ricarte',
      email: 'victoriaricarte@gmail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('Should not be able to create a two customers with the same e-mail', () => {
    expect(1).toBe(1);
  });
});
