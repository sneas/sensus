export type Failure = {
  status: 'failure';
  reason: string;
  extra?: any | typeof Error;
};

export type Success<T> = {
  status: 'success';
  value: T;
};

export type Result<T> = Success<T> | Failure;

export const isSuccess = <T>(result: Result<T>): result is Success<T> =>
  result.status === 'success';

export const isError = (object: any): object is Failure => {
  if (typeof object !== 'object' || object === null) {
    return false;
  }

  return (
    object.status === 'failure' &&
    object.reason
  );
};

export const resultify = async <T>(
  p: Promise<T>,
  failureReason: { reason: string }
): Promise<Result<T>> => {
  try {
    const value = await p;
    return { status: 'success', value };
  } catch (e: unknown) {
    return {
      status: 'failure',
      ...failureReason,
      extra: e,
    };
  }
};
