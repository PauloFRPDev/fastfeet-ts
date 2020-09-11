import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import Delivery from './Delivery';

@Entity('recipients')
class Recipient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column({ nullable: true })
  complement: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  cep: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Delivery, delivery => delivery.recipient)
  delivery: Delivery[];
}

export default Recipient;
