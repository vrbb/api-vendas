import { IHashProvider } from './../providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { getCustomRepository, InsertResult } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import '@modules/users/providers';
interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('BcryptHashProvider')
    private bcryptHashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<InsertResult> {
    const userRepository = getCustomRepository(UsersRepository);
    const userExist = await userRepository.findByEmail(email);
    if (userExist) {
      throw new AppError('There is already one user with this email!');
    }

    const hashedPassword = await this.bcryptHashProvider.generateHash(password);

    const user = userRepository.insert({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
