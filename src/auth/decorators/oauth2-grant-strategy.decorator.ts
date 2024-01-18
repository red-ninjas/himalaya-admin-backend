import 'reflect-metadata';
import { OAUTH2_STRATEGY_METADATA } from '../services/strategy.explorer';

export const Oauth2GrantStrategy = (name: string): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(OAUTH2_STRATEGY_METADATA, name, target);
  };
};
