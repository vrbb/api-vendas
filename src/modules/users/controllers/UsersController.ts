import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
import UpdateUserAvataService from '../services/UpdateUserAvatarService';

export default class UsersController {
  public async index(resquest: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService();

    const users = await listUsers.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }

  public async createSession(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const userSession = new CreateSessionsService();

    const session = await userSession.execute({
      email,
      password,
    });
    return response.json(session);
  }

  public async uploadAvatar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userAvatarService = new UpdateUserAvataService();
    console.log('chegou no controller');
    const { file, user } = request as any;

    const userAvatar = await userAvatarService.execute({
      avatarFileName: file.filename,
      userId: user.id,
    });
    return response.json(userAvatar);
  }
}
