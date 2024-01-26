import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import ms from 'ms';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OAUTH2_SERVER_OPTIONS } from '../auth.constants';
import { AuthJwtTokenEntity } from '../entities/auth-jwt-token.entity';
import { InvalidUserException } from '../exceptions/invalid-user.exception';
import { JwtTokenGuard } from '../../jwt/guards/jwt-token.guard';
import {
  UserClass,
  UserLoaderInterface,
  UserValidatorInterface,
} from '../interfaces';
import { SignInDto } from '../requests/sign-request.dto';
import { AuthLoginTokenResponse } from '../responses/auth-login-token.response';
import { OAuth2Options } from '../types';
import { TokenResponse } from '../responses/token-response.dto';
import { IsNumber } from 'class-validator';
import { isEmpty, isString } from 'lodash';

@Controller({
  path: 'authentication',
  version: ['1'],
})
@ApiTags('Authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  /**
   * Constructor
   *
   * @param clientRepository
   * @param strategyRegistry
   */
  constructor(
    private readonly jwtService: JwtService,
    @Inject('UserValidatorInterface')
    private readonly userValidator: UserValidatorInterface,
    @Inject('UserLoaderInterface')
    private readonly userLoader: UserLoaderInterface,
    @Inject(OAUTH2_SERVER_OPTIONS)
    private readonly options: OAuth2Options,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(AuthJwtTokenEntity)
    private readonly jwtRepo: Repository<AuthJwtTokenEntity>,
  ) {}

  @Post('login')
  @Version('1')
  @ApiResponse({ status: 401, description: 'Wrong credentials.' })
  @ApiResponse({ status: 201, type: AuthLoginTokenResponse })
  async login(@Body() credentials: SignInDto): Promise<AuthLoginTokenResponse> {
    const user = await this.userValidator.validate(
      this.dataSource,
      credentials.email,
      credentials.password,
    );

    if (!user) {
      throw InvalidUserException.wrongCredentials();
    }

    const tokenExpires: number = isEmpty(this.options.jwtExpires)
      ? ms('1d')
      : isString(this.options.jwtExpires)
      ? ms(this.options.jwtExpires)
      : this.options.jwtExpires;

    const tokenRefreshExpires: number = isEmpty(this.options.jwtRefreshExpires)
      ? ms('7 days')
      : isString(this.options.jwtRefreshExpires)
      ? ms(this.options.jwtRefreshExpires)
      : this.options.jwtRefreshExpires;

    const token = await this.jwtService.signAsync(user.toJSON(), {
      jwtid: uuidv4(),
      subject: user.id,
      expiresIn: tokenExpires,
      secret: this.options.jwtSecret,
    });

    const refreshToken = await this.jwtService.signAsync(user.toJSON(), {
      jwtid: uuidv4(),
      subject: user.id,
      expiresIn: tokenRefreshExpires,
      secret: this.options.jwtSecret,
    });

    const newJetToken = this.jwtRepo.create();
    newJetToken.identifier = user.id;
    newJetToken.accessToken = token;
    newJetToken.refreshToken = refreshToken;
    newJetToken.accessTokenExpiresAt = new Date(Date.now() + tokenExpires);
    newJetToken.refreshTokenExpiresAt = new Date(
      Date.now() + tokenRefreshExpires,
    );
    newJetToken.createdAt = new Date();
    newJetToken.save();

    return new AuthLoginTokenResponse(
      new TokenResponse(
        token,
        newJetToken.accessTokenExpiresAt,
        tokenExpires,
        refreshToken,
        newJetToken.refreshTokenExpiresAt,
        tokenRefreshExpires,
      ),
      user,
    );
  }

  @UseGuards(JwtTokenGuard)
  @ApiBearerAuth()
  @ApiExtraModels(UserClass)
  @ApiResponse({ type: UserClass })
  @Get('me')
  @Version('1')
  async validate(@Req() req: Request): Promise<UserClass> {
    try {
      return await this.userLoader.load(this.dataSource, (req as any).user.id);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @UseGuards(JwtTokenGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The logout was successfully.',
  })
  @ApiResponse({ status: 403, description: 'Unauthorized or invalid token.' })
  @Get('logout')
  @Version('1')
  async logout(@Req() req: Request) {
    await this.jwtRepo.update(
      { accessToken: (req as any).userToken, identifier: (req as any).user.id },
      { revokedAt: new Date() },
    );
  }

  @UseGuards(JwtTokenGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The logout from all devices was successfully.',
  })
  @ApiResponse({ status: 403, description: 'Unauthorized or invalid token.' })
  @Get('logoutAll')
  @Version('1')
  async logoutAll(@Req() req: Request) {
    await this.jwtRepo.update(
      { identifier: (req as any).user.id },
      { revokedAt: new Date() },
    );
  }
}
