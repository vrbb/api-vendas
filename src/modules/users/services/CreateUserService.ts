import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository, InsertResult } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<InsertResult> {
    const userRepository = getCustomRepository(UsersRepository);
    const userExist = await userRepository.findByEmail(email);
    if (userExist) {
      throw new AppError('There is already one user with this email!');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.insert({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    return user;
  }
}

export default CreateUserService;
