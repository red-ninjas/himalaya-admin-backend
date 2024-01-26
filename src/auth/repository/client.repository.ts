import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Oauth2ClientEntity } from '../entities/oauth2-client.entity';
import { ClientNotFoundException } from '../exceptions/client-not-found.exception';
import { ClientRepositoryInterface } from '../interfaces/client-repository.interface';

@Injectable()
export class ClientRepository implements ClientRepositoryInterface {
  constructor(
    @InjectRepository(Oauth2ClientEntity)
    private readonly repository: Repository<Oauth2ClientEntity>,
  ) {}

  async find(id: string): Promise<Oauth2ClientEntity> {
    const client = await this.repository.findOneBy({ id });

    if (!client) {
      throw ClientNotFoundException.withId(id);
    }

    return client;
  }

  async findByClientId(clientId: string): Promise<Oauth2ClientEntity> {
    const client = await this.repository.findOne({
      where: {
        clientId: clientId,
      },
    });

    if (!client) {
      throw ClientNotFoundException.withClientId(clientId);
    }

    return client;
  }

  async findByName(name: string): Promise<Oauth2ClientEntity> {
    const client = await this.repository.findOne({
      where: {
        name: name,
      },
    });

    if (!client) {
      throw ClientNotFoundException.withName(name);
    }

    return client;
  }

  async create(client: Oauth2ClientEntity): Promise<Oauth2ClientEntity> {
    return await this.repository.save(client);
  }

  async delete(client: Oauth2ClientEntity): Promise<Oauth2ClientEntity> {
    client.deletedAt = new Date();

    return await this.repository.save(client);
  }
}
