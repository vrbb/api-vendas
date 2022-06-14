import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmaillService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userExist = await userRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError('User does not exists.');
    }
    const userToken = await userTokenRepository.generate(userExist.id);
    console.log(userToken);
  }
}

export default SendForgotPasswordEmaillService;
