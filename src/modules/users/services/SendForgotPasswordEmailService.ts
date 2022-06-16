import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import etherealMail from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmaillService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);
    console.log(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }
    const userToken = await userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );
    await etherealMail.sendMail({
      to: {
        name: user.name,
        email: email,
      },
      subject: '[API Vendas] - recuperação de senha',

      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: 'http://localhost:3000/user/reset_password?token='.concat(
            userToken.token,
          ),
        },
      },
    });
  }
}

export default SendForgotPasswordEmaillService;
