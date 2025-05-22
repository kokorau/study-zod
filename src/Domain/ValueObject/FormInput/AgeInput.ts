import { z } from 'zod';
import type { Result } from '../../Common/Result';
import { success, failure } from '../../Common/Result';
import type { ValidationError } from '../../Error/ValidationError';
import { createValidationError } from '../../Error/ValidationError';
import { ErrorCodes, type ErrorCode } from '../../Error/ErrorCodes';

/**
 * 年齢入力を表現するインターフェース
 */
export interface AgeInput {
  readonly value: number;
}

/**
 * 年齢入力に関する操作を提供するオブジェクト
 */
export const $AgeInput = {
  /**
   * 年齢入力のバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => z.number()
    .int({
      message: ErrorCodes.INVALID_FORMAT
    })
    .min(0, {
      message: ErrorCodes.TOO_SMALL
    })
    .max(150, {
      message: ErrorCodes.TOO_LARGE
    }),
  
  /**
   * 年齢入力を作成する
   * @param value 入力値
   * @returns 成功した場合はAgeInputオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value: number | string): Result<AgeInput, ValidationError[]> => {
    // 文字列の場合は数値に変換
    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
    
    // NaNの場合はエラー
    if (isNaN(numValue)) {
      return failure([
        createValidationError('age', ErrorCodes.INVALID_FORMAT)
      ]);
    }
    
    const result = $AgeInput.schema().safeParse(numValue);
    if (!result.success) {
      return failure(
        result.error.errors.map(err => {
          const code = err.message as ErrorCode;
          return createValidationError('age', code);
        })
      );
    }
    return success({ value: result.data });
  },
  
  /**
   * 年齢入力の値を取得する
   * @param input 年齢入力オブジェクト
   * @returns 年齢の数値
   */
  getValue: (input: AgeInput): number => input.value
};
