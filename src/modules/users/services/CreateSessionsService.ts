import AppError from '@shared/errors/AppError';
import { Secret, sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import '@modules/users/providers';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateSessionsService {
  constructor(
    @inject('BcryptHashProvider')
    private bcryptHashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    try {
      const userRepository = getCustomRepository(UsersRepository);
      const user = await userRepository.findByEmail(email);

      if (!user) {
        throw new AppError('Incorrect email/password combination!', 401);
      }

      const passwordConfirmed = await this.bcryptHashProvider.compareHah(
        password,
        user.password,
      );

      if (!passwordConfirmed) {
        throw new AppError('Incorrect email/password combination!', 401);
      }

      const token = sign({}, authConfig.jwt.secret as Secret, {
        subject: user.id,
        expiresIn: authConfig.jwt.expires,
      });
      return {
        user,
        token,
      };
    } catch (error) {
      throw new AppError((error as Error).message);
    }
  }
}

export default CreateSessionsService;
