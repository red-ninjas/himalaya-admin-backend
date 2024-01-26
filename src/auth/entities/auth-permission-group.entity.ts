import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AuthPermissionEntity } from './auth-permission.entity';

@Entity('system_permission_groups')
export class AuthPermissionGroupEntity extends BaseEntity {
  @PrimaryColumn('varchar', {
    length: 120,
  })
  slug: string;

  @Column('varchar', {
    length: 120,
  })
  displayTitle: string;

  @OneToMany(() => AuthPermissionEntity, role => role.group)
  permissions?: Array<AuthPermissionEntity>;
}
