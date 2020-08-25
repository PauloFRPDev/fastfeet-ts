import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity('recipients')
class Recipient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

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
}

export default Recipient;
