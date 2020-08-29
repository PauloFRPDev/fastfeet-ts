import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';

import uploadConfig from '../config/upload';

import Delivery from './Delivery';

@Entity('deliverymen')
class Deliveryman extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Delivery, delivery => delivery.deliveryman)
  delivery: Delivery[];

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default Deliveryman;
