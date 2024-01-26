import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AuthRoleEntity } from './auth-role.entity';

@Unique(['role', 'identifier'])
@Entity('system_user_roles')
export class AuthRoleAssignmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AuthRoleEntity, role => role.slug)
  @JoinColumn({ name: 'role' })
  role: AuthRoleEntity;

  @Column()
  @Index()
  identifier: string;
}
