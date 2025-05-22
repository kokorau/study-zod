/**
 * フォームフィールドを表現する共通インターフェース
 * @template T 入力値の型
 */
export interface FormField<T> {
  readonly value: T;
}
