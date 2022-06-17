// import Order from '@modules/orders/typeorm/entities/Order';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('real')
  price: number;

  @Column('int')
  quantity: number;

  // @ManyToMany(type => Order, order => order.orders)
  // @JoinTable()
  // orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
