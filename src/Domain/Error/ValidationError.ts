import type { ErrorCode } from './ErrorCodes';

/**
 * バリデーションエラーを表現するインターフェース
 */
export interface ValidationError {
  /** エラーが発生したフィールド名 */
  field: string;
  /** エラーコード */
  code: ErrorCode;
}

/**
 * バリデーションエラーを作成する
 * @param field エラーが発生したフィールド名
 * @param code エラーコード
 * @returns ValidationErrorオブジェクト
 */
export const createValidationError = (
  field: string,
  code: ErrorCode
): ValidationError => ({
  field,
  code
});
