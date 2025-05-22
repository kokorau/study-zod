import { z } from 'zod';
import type { Result } from '../../Common/Result';
import { success, failure } from '../../Common/Result';
import type { ValidationError } from '../../Error/ValidationError';
import { createValidationError } from '../../Error/ValidationError';
import { ErrorCodes, type ErrorCode } from '../../Error/ErrorCodes';

/**
 * 名前入力を表現するインターフェース
 */
export interface NameInput {
  readonly value: string;
}

/**
 * 名前入力に関する操作を提供するオブジェクト
 */
export const $NameInput = {
  /**
   * 名前入力のバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => z.string().min(1, {
    message: ErrorCodes.REQUIRED
  }),
  
  /**
   * 名前入力を作成する
   * @param value 入力値
   * @returns 成功した場合はNameInputオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value: string): Result<NameInput, ValidationError[]> => {
    const result = $NameInput.schema().safeParse(value);
    if (!result.success) {
      return failure(
        result.error.errors.map(err => {
          // エラーメッセージがエラーコードになっているので、それを使用する
          const code = err.message as ErrorCode;
          return createValidationError('name', code);
        })
      );
    }
    return success({ value: result.data });
  },
  
  /**
   * 名前入力の値を取得する
   * @param input 名前入力オブジェクト
   * @returns 名前の文字列
   */
  getValue: (input: NameInput): string => input.value
};
