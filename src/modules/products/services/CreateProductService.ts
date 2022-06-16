import AppError from '@shared/errors/AppError';
import { getCustomRepository, InsertResult } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: IRequest): Promise<InsertResult> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);
    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = await productsRepository.insert({
      name,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
