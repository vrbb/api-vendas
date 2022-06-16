import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(id);
    if (!user) {
      throw new AppError('User not found!');
    }
    const userExist = await userRepository.findByEmail(email);
    if (userExist && userExist.id !== id) {
      throw new AppError('There is already one user with this email!');
    }
    if (password && !old_password) {
      throw new AppError('Old password is required!');
    }
    if (password && old_password) {
      const check_old_password = compare(old_password, user.password);
      if (!check_old_password) {
        throw new AppError('Old password does not match!');
      }
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
