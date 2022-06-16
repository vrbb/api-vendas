import 'typeorm';
import { getCustomRepository } from 'typeorm';
import Custumer from '../typeorm/entities/Customer';
import { CustumersRepository } from '../typeorm/repositories/CustomerRepository';

class ListCustumersService {
  public async execute(): Promise<Custumer[]> {
    const custumerRepository = getCustomRepository(CustumersRepository);

    const custumers = await custumerRepository.find();

    return custumers;
  }
}

export default ListCustumersService;
