import AppError from '@shared/errors/AppError';
import { getCustomRepository, InsertResult } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<InsertResult> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customerExist = await customerRepository.findByEmail(email);
    if (customerExist) {
      throw new AppError('There is already one customer with this email!');
    }

    const customer = customerRepository.insert({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
