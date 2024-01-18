import { Injectable, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class AdminLoader {
  private readonly logger = new Logger('AdminCoreModule');

  constructor(httpAdapter: HttpAdapterHost) {
    this.logger.log('Admin Loader Bootstrap!');
  }
}
