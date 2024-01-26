import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OAuth2Request } from '../requests/oauth2-request.dto';
import { Oauth2ClientEntity } from './oauth2-client.entity';

@Entity('system_oauth2_access_tokens')
export class Oauth2AccessTokenEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
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

  @ManyToOne(type => Oauth2ClientEntity, { nullable: false })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client: Oauth2ClientEntity;

  @Column({ nullable: true, name: 'user_id' })
  userId: string;

  @Column({ nullable: true, length: 500 })
  scope: string;

  @Column('datetime', {
    name: 'created_on',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({ name: 'created_from', type: 'json', nullable: true })
  createdFrom: OAuth2Request;
}
