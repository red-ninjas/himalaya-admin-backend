export class NoDecoratorException extends Error {
  constructor(className: string) {
    super(`The entity ${className} hasnt a @EntityAccessor() decorator`);
  }
}
