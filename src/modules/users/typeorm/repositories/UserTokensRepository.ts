import { EntityRepository, Repository } from 'typeorm';

import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user_token = await this.findOne({
      where: {
        token,
      },
    });
    return user_token;
  }
  public async findByUser(user_id: string): Promise<UserToken | undefined> {
    const user_token = await this.findOne({
      where: {
        user_id,
      },
    });
    return user_token;
  }
  public async generate(user_id: string): Promise<UserToken | undefined> {
    const user_token = await this.create({
      user_id,
    });
    return user_token;
  }
}
