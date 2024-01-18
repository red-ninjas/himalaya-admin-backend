import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../entities/client.entity';
import { ClientNotFoundException } from '../exceptions/client-not-found.exception';
import { ClientRepositoryInterface } from '../interfaces/client-repository.interface';

@Injectable()
export class ClientRepository implements ClientRepositoryInterface {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repository: Repository<ClientEntity>,
  ) {}

  async find(id: string): Promise<ClientEntity> {
    const client = await this.repository.findOneBy({ id });

    if (!client) {
      throw ClientNotFoundException.withId(id);
    }

    return client;
  }

  async findByClientId(clientId: string): Promise<ClientEntity> {
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

  async findByName(name: string): Promise<ClientEntity> {
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

  async create(client: ClientEntity): Promise<ClientEntity> {
    return await this.repository.save(client);
  }

  async delete(client: ClientEntity): Promise<ClientEntity> {
    client.deletedAt = new Date();

    return await this.repository.save(client);
  }
}
