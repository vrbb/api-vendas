import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findOne(id);
    if (!customer) {
      throw new AppError('Customer not found.');
    }
    await customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
