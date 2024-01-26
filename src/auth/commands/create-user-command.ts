/**
 * Create an access token
 */

export class CreateUserCommand {
  constructor(
    public readonly username: string,
    public readonly plainPassword?: string,
    public readonly role?: string,
  ) {}
}
