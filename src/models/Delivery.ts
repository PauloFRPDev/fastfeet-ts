import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';

import uploadConfig from '../config/upload';

import Recipient from './Recipient';
import Deliveryman from './Deliveryman';
import Problem from './Problem';

@Entity('deliveries')
class Delivery extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recipient_id: number;

  @ManyToOne(() => Recipient, recipient => recipient.delivery)
  @JoinColumn({ name: 'recipient_id' })
  recipient: Recipient;

  @Column()
  deliveryman_id: number;

  @ManyToOne(() => Deliveryman, deliveryman => deliveryman.delivery)
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: Deliveryman;

  @Column({ nullable: true })
  signature: string;

  @Column()
  product: string;

  @Column({ nullable: true })
  canceled_at: Date;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Problem, problem => problem.delivery)
  problem: Problem[];

  @Expose({ name: 'signature_url' })
  getSignatureUrl(): string | null {
    if (!this.signature) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_URL}/files/${this.signature}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${this.signature}`;
      default:
        return null;
    }
  }
}

export default Delivery;
