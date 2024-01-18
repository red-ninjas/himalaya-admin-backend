import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PermissionEntity } from './auth-permission.entity';
import { QueryEntity, ViewableColumn } from '../../query/decorators';
import { ApiProperty } from '@nestjs/swagger';

@Entity('schema_auth_roles')
@QueryEntity()
export class RoleEntity extends BaseEntity {
  @ViewableColumn()
  @ApiProperty()
  @PrimaryColumn('varchar', {
    length: 120,
  })
  slug: string;

  @ViewableColumn()
  @ApiProperty()
  @Column('varchar', {
    length: 120,
  })
  displayTitle: string;

  @OneToMany(() => PermissionEntity, permission => permission.slug)
  permissions?: Array<PermissionEntity>;
}
