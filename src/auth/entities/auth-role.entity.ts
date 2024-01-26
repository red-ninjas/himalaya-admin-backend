import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { AuthPermissionEntity } from './auth-permission.entity';
import { AuthRoleAssignmentEntity } from './auth-role-assignment.entity';

@Entity('system_roles')
export class AuthRoleEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryColumn('varchar', {
    length: 120,
  })
  slug: string;

  @ApiProperty()
  @Column('varchar', {
    length: 120,
  })
  displayTitle: string;

  @ManyToMany(() => AuthPermissionEntity)
  @JoinTable({ name: 'system_roles_permissions' })
  permissions: AuthPermissionEntity[];

  @OneToMany(() => AuthRoleAssignmentEntity, users => users.id)
  users: Array<AuthRoleAssignmentEntity>;
}
