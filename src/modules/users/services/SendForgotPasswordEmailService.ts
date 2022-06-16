import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import etherealMail from '@config/mail/EtherealMail';

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
    await etherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${userToken}`,
    });

    console.log(userToken);
  }
}

export default SendForgotPasswordEmaillService;
