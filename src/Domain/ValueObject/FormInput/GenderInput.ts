import { z } from 'zod';
import type { Result } from '../../Common/Result';
import { success, failure } from '../../Common/Result';
import type { ValidationError } from '../../Error/ValidationError';
import { createValidationError } from '../../Error/ValidationError';
import { ErrorCodes } from '../../Error/ErrorCodes';
import type { FormInput } from './FormInput';
import type { FormInputUtil, EnumInput } from './FormInputFactory';

/**
 * 性別の列挙型
 */
export const GenderEnum = {
  MALE: 'male',
  FEMALE: 'female'
} as const;

/**
 * 性別の型（リテラル型のユニオン）
 */
export type Gender = 'male' | 'female';

/**
 * 性別入力を表現する型
 */
export type GenderInput = FormInput<Gender>;

/**
 * 性別入力のバリデーションスキーマを定義
 */
const genderSchema = () => z.enum([GenderEnum.MALE, GenderEnum.FEMALE], {
  errorMap: () => ({ message: ErrorCodes.REQUIRED })
});

/**
 * 性別入力に関する操作を提供するオブジェクト
 */
export const $GenderInput: FormInputUtil<GenderInput, EnumInput<Gender>> = {
  /**
   * 性別入力のバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => genderSchema(),
  
  /**
   * 性別入力を作成する
   * @param value 入力値
   * @returns 成功した場合はGenderInputオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value: string): Result<GenderInput, ValidationError[]> => {
    const result = genderSchema().safeParse(value);
    if (!result.success) {
      return failure([
        createValidationError('gender', ErrorCodes.REQUIRED)
      ]);
    }
    return success({ value: result.data });
  },
  
  /**
   * 性別入力の値を取得する
   * @param input 性別入力オブジェクト
   * @returns 性別の文字列
   */
  getValue: (input: GenderInput): Gender => input.value,
  
  /**
   * 性別の表示名を取得する
   * @param gender 性別
   * @returns 性別の表示名
   */
  getDisplayName: (gender: Gender): string => {
    switch (gender) {
      case GenderEnum.MALE:
        return '男性';
      case GenderEnum.FEMALE:
        return '女性';
      default:
        return '不明';
    }
  }
};
