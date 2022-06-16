import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(id);
    if (!user) {
      throw new AppError('User not found!');
    }
    const userExist = await userRepository.findByEmail(email);
    if (userExist && email != user.email) {
      throw new AppError('There is already one user with this email!');
    }
    user.name = name;
    user.email = email;
    user.password = password;
    user.avatar = avatar;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
