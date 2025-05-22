import { z } from 'zod';
import type { Result } from '../../Common/Result';
import { success, failure } from '../../Common/Result';
import type { ValidationError } from '../../Error/ValidationError';
import { createValidationError } from '../../Error/ValidationError';
import { ErrorCodes, type ErrorCode } from '../../Error/ErrorCodes';

/**
 * 自己紹介入力を表現するインターフェース
 */
export interface BioInput {
  readonly value: string;
}

/**
 * 自己紹介入力に関する操作を提供するオブジェクト
 */
export const $BioInput = {
  /**
   * 自己紹介入力のバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => z.string()
    .max(1000, {
      message: ErrorCodes.TOO_LONG
    })
    .optional()
    .transform(val => val || ''), // 未入力の場合は空文字列に変換
  
  /**
   * 自己紹介入力を作成する
   * @param value 入力値
   * @returns 成功した場合はBioInputオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value?: string): Result<BioInput, ValidationError[]> => {
    const result = $BioInput.schema().safeParse(value);
    if (!result.success) {
      return failure(
        result.error.errors.map(err => {
          const code = err.message as ErrorCode;
          return createValidationError('bio', code);
        })
      );
    }
    return success({ value: result.data });
  },
  
  /**
   * 自己紹介入力の値を取得する
   * @param input 自己紹介入力オブジェクト
   * @returns 自己紹介の文字列
   */
  getValue: (input: BioInput): string => input.value,
  
  /**
   * 自己紹介が入力されているかどうかを判定する
   * @param input 自己紹介入力オブジェクト
   * @returns 自己紹介が入力されている場合はtrue、そうでない場合はfalse
   */
  hasValue: (input: BioInput): boolean => !!input.value.trim()
};
