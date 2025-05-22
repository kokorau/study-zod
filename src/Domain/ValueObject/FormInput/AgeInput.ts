import { z } from 'zod';
import { ErrorCodes } from '../../Error/ErrorCodes';
import type { FormInput } from './FormInput';
import { createFormInputFactory, type FormInputUtil, type NumberInput } from './FormInputFactory';
import { failure } from '../../Common/Result';
import { createValidationError } from '../../Error/ValidationError';

/**
 * 年齢入力を表現する型
 */
export type AgeInput = FormInput<number>;

/**
 * 年齢入力のバリデーションスキーマを定義
 */
const ageSchema = () => z.number()
  .int({
    message: ErrorCodes.INVALID_FORMAT
  })
  .min(0, {
    message: ErrorCodes.TOO_SMALL
  })
  .max(150, {
    message: ErrorCodes.TOO_LARGE
  });

/**
 * 入力値を数値に変換する関数
 * @param value 入力値
 * @returns 変換された数値、または変換できない場合はNaN
 */
const parseAgeValue = (value: number | string) => {
  // 文字列の場合は数値に変換
  const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
  
  // NaNの場合はエラー
  if (isNaN(numValue)) {
    throw new Error(ErrorCodes.INVALID_FORMAT);
  }
  
  return numValue;
};

/**
 * 年齢入力に関する操作を提供するオブジェクト
 */
export const $AgeInput: FormInputUtil<AgeInput, NumberInput> = {
  /**
   * 年齢入力のバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => ageSchema(),
  
  /**
   * 年齢入力を作成する
   * @param value 入力値
   * @returns 成功した場合はAgeInputオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value: number | string) => {
    try {
      const numValue = parseAgeValue(value);
      return createFormInputFactory<number, number>(
        ageSchema,
        'age'
      ).create(numValue);
    } catch (error) {
      return failure([
        createValidationError('age', ErrorCodes.INVALID_FORMAT)
      ]);
    }
  },
  
  /**
   * 年齢入力の値を取得する
   * @param input 年齢入力オブジェクト
   * @returns 年齢の数値
   */
  getValue: (input: AgeInput): number => input.value
};
