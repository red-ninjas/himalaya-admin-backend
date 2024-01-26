import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('system_user_tokens')
export class AuthJwtTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  identifier: string;

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

  @Column('datetime', {
    name: 'created_on',
    nullable: false,
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'revoked_at',
    nullable: true,
  })
  revokedAt: Date;
}
