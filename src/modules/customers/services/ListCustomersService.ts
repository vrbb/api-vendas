import 'typeorm';
import { getCustomRepository } from 'typeorm';
import Custumer from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

class ListCustumersService {
  public async execute(): Promise<Custumer[]> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const custumers = await customerRepository.find();

    return custumers;
  }
}

export default ListCustumersService;
