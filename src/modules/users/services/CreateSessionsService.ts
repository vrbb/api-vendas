import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { Response, response } from 'express';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    try {
      const userRepository = getCustomRepository(UsersRepository);
      const user = await userRepository.findByEmail(email);

      if (!user) {
        throw new AppError('Incorrect email/password combination!', 401);
      }

      const passwordConfirmed = await compare(password, user.password);

      if (!passwordConfirmed) {
        throw new AppError('Incorrect email/password combination!', 401);
      }

      const token = sign({}, authConfig.jwt.secret, {
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
