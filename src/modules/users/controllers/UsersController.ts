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
    const { name, email, password, avatar } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      avatar,
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
    const avatarFileName = request.body;
    const userId = request.user.id;
    const userAvatarService = new UpdateUserAvataService();

    const avatar = await userAvatarService.execute({
      avatarFileName,
      userId,
    });
    return response.json(avatar);
  }
}
