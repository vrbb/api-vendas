import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}
class ShowUserService {
  public async execute({ id }: IRequest): Promise<User | undefined> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = userRepository.findOne(id);
    if (!user) {
      throw new AppError('User not found.');
    }
    return user;
  }
}

export default ShowUserService;
