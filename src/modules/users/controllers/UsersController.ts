import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import UpdateUserAvataService from '../services/UpdateUserAvatarService';

export default class UsersController {
  public async index(resquest: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService();

    const users = await listUsers.execute();

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
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
    return response.json(instanceToInstance(session));
  }

  public async uploadAvatar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userAvatarService = new UpdateUserAvataService();

    const { file, user } = request as any;

    const userAvatar = await userAvatarService.execute({
      avatarFileName: file.filename,
      userId: user.id,
    });
    return response.json(instanceToInstance(userAvatar));
  }

  public async showProfile(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userProfile = new ShowProfileService();

    const { user } = request as any;

    const userAvatar = await userProfile.execute({
      id: user.id,
    });
    return response.json(instanceToInstance(userAvatar));
  }

  public async updateProfile(
    request: Request,
    response: Response,
  ): Promise<Response> {
    console.log('Entrou no controller');
    const userProfile = new UpdateProfileService();

    const { user, body } = request as any;

    const userAvatar = await userProfile.execute({
      id: user.id,
      name: body.name,
      email: body.email,
      password: body.password,
      old_password: body.old_password,
    });
    return response.json(instanceToInstance(userAvatar));
  }
}
