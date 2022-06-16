import AppError from '@shared/errors/AppError';
import { getCustomRepository, InsertResult } from 'typeorm';
import { CustumersRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustumerService {
  public async execute({ name, email }: IRequest): Promise<InsertResult> {
    const custumerRepository = getCustomRepository(CustumersRepository);
    const custumerExist = await custumerRepository.findByEmail(email);
    if (custumerExist) {
      throw new AppError('There is already one custumer with this email!');
    }

    const custumer = custumerRepository.insert({
      name,
      email,
    });

    return custumer;
  }
}

export default CreateCustumerService;
