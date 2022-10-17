import CreateUserService from '../CreateUserService';

describe('Create User Service', () => {
  it('Should be able to create a new user', async () => {
    const createUser = new CreateUserService();

    const userMock = {
      name: 'Victoria Ricarte Bispo',

      email: 'victoriaricarte@gmail.com',

      password: 'testsenha',
    };

    const response = await createUser.execute(userMock);
    expect(response).toHaveProperty('id');
  });
});
