import { z } from 'zod';
import { ErrorCodes } from '../../Error/ErrorCodes';
import type { FormInput } from './FormInput';
import { createFormInputFactory, type FormInputUtil, type StringInput, type OptionalInput } from './FormInputFactory';

/**
 * 自己紹介入力を表現する型
 */
export type BioInput = FormInput<string>;

/**
 * 自己紹介入力のバリデーションスキーマを定義
 */
const bioSchema = () => z.string()
  .max(1000, {
    message: ErrorCodes.TOO_LONG
  });

/**
 * 自己紹介入力に関する操作を提供するオブジェクト
 */
export const $BioInput: FormInputUtil<BioInput, OptionalInput<StringInput>> = {
  /**
   * 自己紹介入力のバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => bioSchema(),
  
  /**
   * 自己紹介入力を作成する
   * @param value 入力値
   * @returns 成功した場合はBioInputオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value?: string) => {
    // 未入力の場合は空文字列に変換
    const normalizedValue = value || '';
    return createFormInputFactory<string, string>(
      bioSchema,
      'bio'
    ).create(normalizedValue);
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
