import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { RoleEntity } from './auth-role.entity';

@Unique(['role', 'identifier'])
@Entity('schema_auth_client_roles')
export class ClientRolesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoleEntity, role => role.slug)
  role: RoleEntity;

  @Column()
  identifier: string;
}
