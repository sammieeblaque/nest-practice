import { BaseEntity } from '@/shared/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class Users extends BaseEntity {
  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @Column({ length: 50, nullable: true })
  firstName: string;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({ length: 20, nullable: true, unique: true })
  phoneNumber: string;

  @Column({ length: 255, nullable: true })
  password: string;
}
