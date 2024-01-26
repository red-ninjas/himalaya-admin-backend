import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthJwtTokenEntity } from '../entities/auth-jwt-token.entity';

@Injectable()
export class AuthTasksService {
  private readonly logger = new Logger(AuthTasksService.name);

  constructor(
    @InjectRepository(AuthJwtTokenEntity)
    private readonly jwtRepo: Repository<AuthJwtTokenEntity>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    this.logger.debug('Clear none-refreshable jwt tokens');
    this.jwtRepo
      .createQueryBuilder()
      .delete()
      .where('refreshTokenExpiresAt <= :currentDate', {
        currentDate: Date.now(),
      })
      .execute();
  }
}
