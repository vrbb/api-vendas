import DeleteUserService from './../../services/DeleteUserService';

describe('Delete User Service', () => {
  it('Should be able to delete a user', async () => {
    const userMock = {
      id: 1,

      name: 'Victoria Ricarte Bispo',

      email: 'victoriaricarte@gmail.com',

      password: 'testsenha',
    };

    const response = await DeleteUserService.execute({ id: 1 });
  });
});
