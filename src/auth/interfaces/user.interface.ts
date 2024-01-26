import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export interface UserClassPayload {
  id: string;
  email: string;
}
export class UserClass {
  @ApiProperty({
    type: String,
    description: 'The user id',
    required: true,
  })
  @Expose({ name: 'id' })
  id: string;

  @ApiProperty({
    type: String,
    description: 'The user email address',
    required: true,
  })
  @Expose({ name: 'email' })
  email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  toJSON(): UserClassPayload {
    return { email: this.email, id: this.id };
  }

  static fromJSON(object: UserClassPayload) {
    return new UserClass(object.id, object.email);
  }
}
