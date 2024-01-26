export type ClassProperties<
  C extends new (...args: readonly unknown[]) => unknown
> = C extends new (...args: readonly unknown[]) => infer R
  ? { [K in keyof R]?: boolean }
  : never;
export type ClassLike<T> = new <T>(...args: any[]) => any;
