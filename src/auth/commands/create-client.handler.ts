import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateClientCommand } from './create-client.command';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import * as selfsigned from 'selfsigned';
import { Oauth2ClientEntity } from '../entities';
import { ClientCreatedEvent } from '../events/client-created.event';
import { ClientRepositoryInterface } from '../interfaces/client-repository.interface';

@CommandHandler(CreateClientCommand)
export class CreateClientHandler
  implements ICommandHandler<CreateClientCommand> {
  constructor(
    @Inject('ClientRepositoryInterface')
    private readonly clientRepository: ClientRepositoryInterface,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * Execute the create Client Command
   *
   * @param command
   */
  async execute(command: CreateClientCommand) {
    const client = new Oauth2ClientEntity();
    client.name = command.name;
    client.clientId = command.clientId || uuidv4();
    if (!command.noSecret) {
      client.clientSecret = crypto.randomBytes(32).toString('hex');
    }

    client.scope = command.scope;
    client.accessTokenLifetime = command.accessTokenLifetime || 3600;
    client.refreshTokenLifetime = command.refreshTokenLifetime || 7200;
    client.grants = command.grants || ['client_credentials', 'refresh_token'];

    // generate keys
    const attrs = [{ name: 'commonName', value: command.name }];
    const pem = selfsigned.generate(attrs, { days: 365 });

    client.privateKey = pem.private;
    client.publicKey = pem.public;
    client.cert = pem.cert;

    const exp = new Date();
    exp.setDate(exp.getDate() + 365);
    client.certExpiresAt = exp;

    const createdClient = await this.clientRepository.create(client);

    // emit an access token created event
    this.eventBus.publish(
      new ClientCreatedEvent(
        createdClient.id,
        createdClient.name,
        createdClient.clientId,
        createdClient.certExpiresAt,
      ),
    );

    return createdClient;
  }
}
