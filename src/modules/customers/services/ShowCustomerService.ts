import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer | undefined> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findOne(id);
    if (!customer) {
      throw new AppError('Customer not found.');
    }
    return customer;
  }
}

export default ShowCustomerService;
