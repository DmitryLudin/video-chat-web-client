export type TRequestError = { message: string; statusCode: number };

export function isRequestError(
  data: unknown | TRequestError
): data is TRequestError {
  const error = data as TRequestError;
  return error.message !== undefined && error.statusCode !== undefined;
}

export type TResponse<T> = {
  data: T | null;
};

export type TDeserializeReturn<T> = (response: TResponse<T>) => T;

export type TDeserializeArrayReturn<T> = (
  response: TResponse<Array<unknown>>
) => Array<T>;
