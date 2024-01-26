import { Oauth2ClientEntity } from '../entities/oauth2-client.entity';

/**
 * This is the main repository you have to implement if you want to
 * store clients in the database
 */
export interface ClientRepositoryInterface {
  /**
   * Find the client with the given ID
   *
   * @param id
   *
   * @throws ClientNotFoundException
   */
  find(id: string): Promise<Oauth2ClientEntity>;

  /**
   * Finds a client using its clientId
   *
   * @param clientId
   *
   * @throws ClientNotFoundException
   */
  findByClientId(clientId: string): Promise<Oauth2ClientEntity>;

  /**
   * Finds a client using its name
   *
   * @param name
   *
   * @throws ClientNotFoundException
   */
  findByName(name: string): Promise<Oauth2ClientEntity>;

  /**
   * Create a new oAuth2 client
   *
   * @param client
   */
  create(client: Oauth2ClientEntity): Promise<Oauth2ClientEntity>;
}
