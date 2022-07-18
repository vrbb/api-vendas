import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    const products = await productsRepository.find();

    await redisCache.save('test', 'test');

    return products;
  }
}

export default ListProductsService;
