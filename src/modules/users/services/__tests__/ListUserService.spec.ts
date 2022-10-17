import ListUsersService from '../ListUsersService';

describe('Create User Service', () => {
  it('Should be able to create a new user', async () => {
    const listUser = new ListUsersService();

    const response = await listUser.execute();
    expect(response).toBeDefined();
  });
});
