import { z } from 'zod';
import type { Result } from '../../Common/Result';
import { success, failure } from '../../Common/Result';
import type { ValidationError } from '../../Error/ValidationError';
import { createValidationError } from '../../Error/ValidationError';
import { ErrorCodes } from '../../Error/ErrorCodes';
import type { FormInput } from './FormInput';
import type { FormInputUtil, EnumInput } from './FormInputFactory';

/**
 * 国籍の列挙型
 */
export const CountryEnum = {
  JAPAN: 'jp',
  USA: 'us',
  UK: 'uk'
} as const;

/**
 * 国籍の型（リテラル型のユニオン）
 */
export type Country = 'jp' | 'us' | 'uk';

/**
 * 国籍入力を表現する型
 */
export type CountryInput = FormInput<Country>;

/**
 * 国籍入力に関する操作を提供するオブジェクト
 */
export const $CountryInput: FormInputUtil<CountryInput, EnumInput<Country>> = {
  /**
   * 国籍入力のバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => z.enum([CountryEnum.JAPAN, CountryEnum.USA, CountryEnum.UK], {
    errorMap: () => ({ message: ErrorCodes.REQUIRED })
  }),
  
  /**
   * 国籍入力を作成する
   * @param value 入力値
   * @returns 成功した場合はCountryInputオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value: string): Result<CountryInput, ValidationError[]> => {
    if (!value) {
      return failure([
        createValidationError('country', ErrorCodes.REQUIRED)
      ]);
    }
    
    const result = $CountryInput.schema().safeParse(value);
    if (!result.success) {
      return failure([
        createValidationError('country', ErrorCodes.INVALID)
      ]);
    }
    return success({ value: result.data });
  },
  
  /**
   * 国籍入力の値を取得する
   * @param input 国籍入力オブジェクト
   * @returns 国籍の文字列
   */
  getValue: (input: CountryInput): Country => input.value,
  
  /**
   * 国籍の表示名を取得する
   * @param country 国籍
   * @returns 国籍の表示名
   */
  getDisplayName: (country: Country): string => {
    switch (country) {
      case CountryEnum.JAPAN:
        return '日本';
      case CountryEnum.USA:
        return 'アメリカ';
      case CountryEnum.UK:
        return 'イギリス';
      default:
        return '不明';
    }
  }
};
