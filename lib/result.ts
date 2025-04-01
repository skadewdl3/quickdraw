export default class Result<T, E> {
  private constructor(
    private readonly value?: T,
    private readonly error?: E,
  ) {}

  static Ok<T, E = never>(value: T): Result<T, E> {
    return new Result<T, E>(value);
  }

  static Err<E, T = never>(error: E): Result<T, E> {
    return new Result<T, E>(undefined, error);
  }

  get isOk(): boolean {
    return this.error === undefined;
  }

  get isErr(): boolean {
    return this.value === undefined;
  }
  unwrap(): T {
    if (this.isOk) return this.value!;
    throw new Error("Tried to unwrap an Err");
  }

  unwrapErr(): E {
    if (this.isErr) return this.error!;
    throw new Error("Tried to unwrapErr an Ok");
  }

  unwrapOr(defaultValue: T): T {
    return this.isOk ? this.value! : defaultValue;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    return this.isOk ? Result.Ok(fn(this.value!)) : Result.Err(this.error!);
  }

  mapErr<F>(fn: (error: E) => F): Result<T, F> {
    return this.isErr ? Result.Err(fn(this.error!)) : Result.Ok(this.value!);
  }

  static wrap<T, A extends any[], E = unknown>(
    fn: (...args: A) => T,
    ...args: A
  ): Result<T, E> {
    try {
      return Result.Ok(fn(...args));
    } catch (error) {
      return Result.Err(error as E);
    }
  }

  static async wrapAsync<T, A extends any[], E = unknown>(
    fn: (...args: A) => Promise<T>,
    ...args: A
  ): Promise<Result<T, E>> {
    try {
      return Result.Ok(await fn(...args));
    } catch (error) {
      return Result.Err(error as E);
    }
  }
}
