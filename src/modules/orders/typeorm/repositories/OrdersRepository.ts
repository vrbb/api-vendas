import Customer from '@modules/customers/typeorm/entities/Customer';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantitte: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.findOne({
      where: {
        id,
      },
      relations: ['order_products', 'custumer'],
    });

    return order;
  }
  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = await this.create({
      customer,
      orderProducts: products,
    });
    await this.save(order);

    return order;
  }
}
