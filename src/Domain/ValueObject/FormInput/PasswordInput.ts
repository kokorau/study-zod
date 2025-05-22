import { z } from 'zod';
import type { Result } from '../../Common/Result';
import { success, failure } from '../../Common/Result';
import type { ValidationError } from '../../Error/ValidationError';
import { createValidationError } from '../../Error/ValidationError';
import { ErrorCodes, type ErrorCode } from '../../Error/ErrorCodes';

/**
 * パスワード入力を表現するインターフェース
 */
export interface PasswordInput {
  readonly value: string;
}

/**
 * パスワード入力に関する操作を提供するオブジェクト
 */
export const $PasswordInput = {
  /**
   * パスワード入力のバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => z.string()
    .min(1, {
      message: ErrorCodes.REQUIRED
    })
    .min(8, {
      message: ErrorCodes.TOO_SHORT
    })
    .regex(/[A-Z]/, {
      message: ErrorCodes.INVALID_FORMAT
    })
    .regex(/[a-z]/, {
      message: ErrorCodes.INVALID_FORMAT
    })
    .regex(/[0-9]/, {
      message: ErrorCodes.INVALID_FORMAT
    }),
  
  /**
   * パスワード入力を作成する
   * @param value 入力値
   * @returns 成功した場合はPasswordInputオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value: string): Result<PasswordInput, ValidationError[]> => {
    const result = $PasswordInput.schema().safeParse(value);
    if (!result.success) {
      return failure(
        result.error.errors.map(err => {
          const code = err.message as ErrorCode;
          return createValidationError('password', code);
        })
      );
    }
    return success({ value: result.data });
  },
  
  /**
   * パスワード入力の値を取得する
   * @param input パスワード入力オブジェクト
   * @returns パスワードの文字列
   */
  getValue: (input: PasswordInput): string => input.value
};
