import Customer from '@modules/customers/typeorm/entities/Customer';
import Product from '@modules/products/typeorm/entities/Product';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
