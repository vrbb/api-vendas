import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    productsRepository.update(id, { name, price, quantity });
  }
}

export default UpdateProductService;
