import DeleteUserService from './../../services/DeleteUserService';

describe('Delete User Service', () => {
  it('Should be able to delete a user', async () => {
    const deleteUser = new DeleteUserService();
    const userMock = {
      id: 1,

      name: 'Victoria Ricarte Bispo',

      email: 'victoriaricarte@gmail.com',

      password: 'testsenha',
    };

    const response = await deleteUser.execute(1);
  });
});
