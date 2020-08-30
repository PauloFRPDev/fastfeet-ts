import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Delivery from './Delivery';

@Entity('delivery_problems')
class Problem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  delivery_id: number;

  @ManyToOne(() => Delivery, delivery => delivery.problem)
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Problem;
