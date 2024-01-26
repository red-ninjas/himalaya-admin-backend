import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Email or Username',
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Password',
  })
  password: string;
}
