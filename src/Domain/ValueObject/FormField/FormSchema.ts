/**
 * フォーム入力を表現する共通インターフェース
 * @template T 入力値の型
 */
export interface FormSchema<T> {
  readonly value: T;
}
