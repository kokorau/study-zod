import { z } from 'zod';
import { ErrorCodes, type ErrorCode } from '../../Error/ErrorCodes';
import type { FormInput } from './FormInput';
import { type FormInputUtil, type StringInput, type OptionalInput } from './FormInputFactory';
import { success, failure } from '../../Common/Result';
import { createValidationError } from '../../Error/ValidationError';

/**
 * 自己紹介入力を表現する型
 */
export type BioInput = FormInput<string>;

/**
 * 自己紹介入力に関する操作を提供するオブジェクト
 */
export const $BioInput: FormInputUtil<BioInput, OptionalInput<StringInput>> = {
  /**
   * 自己紹介入力のバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => z.string()
    .max(1000, {
      message: ErrorCodes.TOO_LONG
    }),
  
  /**
   * 自己紹介入力を作成する
   * @param value 入力値
   * @returns 成功した場合はBioInputオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value?: string) => {
    // 未入力の場合は空文字列に変換
    const normalizedValue = value || '';
    
    // バリデーション実行
    const result = $BioInput.schema().safeParse(normalizedValue);
    if (!result.success) {
      return failure(
        result.error.errors.map((err: z.ZodIssue) => {
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
