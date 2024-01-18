import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';
import { OAuth2Request } from '../requests/oauth2-request.dto';
import { QueryEntity, ViewableColumn } from '../../query';
import { ApiProperty } from '@nestjs/swagger';

@QueryEntity({})
@Entity('schema_access_tokens')
export class AccessTokenEntity extends BaseEntity {
  @ViewableColumn()
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ViewableColumn()
  @Column({
    name: 'access_token',
    primary: true,
    nullable: false,
    length: 80,
  })
  accessToken: string;

  @Column({
    name: 'refresh_token',
    unique: true,
    nullable: false,
    length: 80,
  })
  refreshToken: string;

  @Column('datetime', { name: 'access_token_expires_at', nullable: false })
  accessTokenExpiresAt: Date;

  @Column('datetime', { name: 'refresh_token_expires_at', nullable: false })
  refreshTokenExpiresAt: Date;

  @ManyToOne(type => ClientEntity, { nullable: false })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client: ClientEntity;

  @Column({ nullable: true, name: 'user_id' })
  userId: string;

  @ViewableColumn()
  @Column({ nullable: true, length: 500 })
  scope: string;

  @ViewableColumn()
  @Column('datetime', {
    name: 'created_on',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({ name: 'created_from', type: 'json', nullable: true })
  createdFrom: OAuth2Request;
}
