import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomerRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import Order from '../typeorm/entities/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    try {
      const orderRepository = getCustomRepository(OrdersRepository);
      const customerRepository = getCustomRepository(CustomerRepository);
      const productRepository = getCustomRepository(ProductRepository);

      const getCustomer = await customerRepository.findById(customer_id);
      if (!getCustomer) {
        throw new AppError('This customer not exists!');
      }
      for (let index = 0; index < products.length; index++) {
        const product = await productRepository.findByID(
          products[index].product_id,
        );
        if (product) {
          if (product?.quantity < products[index].quantity) {
            throw new AppError('Not exists this quantity of the product!');
          } else {
            const productUpdate = {
              id: products[index].product_id,
              quantity: product?.quantity - products[index].quantity,
            };
            await productRepository.save(productUpdate);
          }
        } else {
          throw new AppError('Product not exists!');
        }
      }
      const order = await orderRepository.createOrder({
        customer: getCustomer,
        products,
      });

      return order;
    } catch (error) {
      throw new AppError((error as Error).message);
    }
  }
}

export default CreateOrderService;
