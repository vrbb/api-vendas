import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomerRepository);
    const customer = await customersRepository.findOne(id);
    if (!customer) {
      throw new AppError('Customer not found.');
    }
    const customerExists = await customersRepository.findByName(name);
    if (customerExists && name !== customer.name) {
      throw new AppError('There is already one customer with this name');
    }
    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
