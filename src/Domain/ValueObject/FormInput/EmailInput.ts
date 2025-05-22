import { z } from 'zod';
import type { Result } from '../../Common/Result';
import { success, failure } from '../../Common/Result';
import type { ValidationError } from '../../Error/ValidationError';
import { createValidationError } from '../../Error/ValidationError';
import { ErrorCodes, type ErrorCode } from '../../Error/ErrorCodes';

/**
 * メールアドレス入力を表現するインターフェース
 */
export interface EmailInput {
  readonly value: string;
}

/**
 * メールアドレス入力に関する操作を提供するオブジェクト
 */
export const $EmailInput = {
  /**
   * メールアドレス入力のバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => z.string()
    .min(1, {
      message: ErrorCodes.REQUIRED
    })
    .email({
      message: ErrorCodes.INVALID_FORMAT
    }),
  
  /**
   * メールアドレス入力を作成する
   * @param value 入力値
   * @returns 成功した場合はEmailInputオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value: string): Result<EmailInput, ValidationError[]> => {
    const result = $EmailInput.schema().safeParse(value);
    if (!result.success) {
      return failure(
        result.error.errors.map(err => {
          const code = err.message as ErrorCode;
          return createValidationError('email', code);
        })
      );
    }
    return success({ value: result.data });
  },
  
  /**
   * メールアドレス入力の値を取得する
   * @param input メールアドレス入力オブジェクト
   * @returns メールアドレスの文字列
   */
  getValue: (input: EmailInput): string => input.value
};
