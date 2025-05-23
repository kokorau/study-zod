/**
 * 成功または失敗を表現するためのResult型
 */
export type Result<T, E> = Success<T> | Failure<E>;

/**
 * 成功を表現するインターフェース
 */
export interface Success<T> {
  readonly _tag: 'success';
  readonly value: T;
}

/**
 * 失敗を表現するインターフェース
 */
export interface Failure<E> {
  readonly _tag: 'failure';
  readonly error: E;
}

/**
 * 成功を表現するオブジェクトを作成する
 */
export const success = <T>(value: T): Success<T> => ({
  _tag: 'success',
  value
});

/**
 * 失敗を表現するオブジェクトを作成する
 */
export const failure = <E>(error: E): Failure<E> => ({
  _tag: 'failure',
  error
});

/**
 * 結果を処理するためのユーティリティ関数
 * 成功の場合はonSuccess関数を、失敗の場合はonFailure関数を適用する
 */
export const match = <T, E, R>(
  result: Result<T, E>,
  onSuccess: (value: T) => R,
  onFailure: (error: E) => R
): R => {
  return result._tag === 'success'
    ? onSuccess(result.value)
    : onFailure(result.error);
};

/**
 * 成功の場合のみ変換を適用する
 */
export const map = <T, U, E>(
  result: Result<T, E>,
  f: (value: T) => U
): Result<U, E> => {
  return result._tag === 'success'
    ? success(f(result.value))
    : result;
};

/**
 * 成功の場合のみ別のResultを返す関数を適用する
 */
export const flatMap = <T, U, E>(
  result: Result<T, E>,
  f: (value: T) => Result<U, E>
): Result<U, E> => {
  return result._tag === 'success'
    ? f(result.value)
    : result;
};
