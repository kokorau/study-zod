import { z } from 'zod';
import { ErrorCodes } from '../../Error/ErrorCodes';
import type { FormInput } from './FormInput';
import { createFormInputFactory, type FormInputUtil, type BooleanInput } from './FormInputFactory';
import { failure } from '../../Common/Result';
import { createValidationError } from '../../Error/ValidationError';

/**
 * 利用規約同意入力を表現する型
 */
export type TermsAgreementInput = FormInput<boolean>;

/**
 * 利用規約同意入力のバリデーションスキーマを定義
 */
const termsAgreementSchema = () => z.boolean()
  .refine(val => val === true, {
    message: ErrorCodes.REQUIRED
  });

/**
 * 入力値をブール値に変換する関数
 * @param value 入力値
 * @returns 変換されたブール値
 */
const parseTermsAgreementValue = (value: boolean | string): boolean => {
  return typeof value === 'string' 
    ? value === 'true' || value === 'on' || value === '1'
    : !!value;
};

/**
 * 利用規約同意入力に関する操作を提供するオブジェクト
 */
export const $TermsAgreementInput: FormInputUtil<TermsAgreementInput, BooleanInput> = {
  /**
   * 利用規約同意入力のバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => termsAgreementSchema(),
  
  /**
   * 利用規約同意入力を作成する
   * @param value 入力値
   * @returns 成功した場合はTermsAgreementInputオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value: boolean | string) => {
    const boolValue = parseTermsAgreementValue(value);
    
    const result = termsAgreementSchema().safeParse(boolValue);
    if (!result.success) {
      return failure([
        createValidationError('agreeTerms', ErrorCodes.REQUIRED)
      ]);
    }
    return createFormInputFactory<boolean, boolean>(
      termsAgreementSchema,
      'agreeTerms'
    ).create(boolValue);
  },
  
  /**
   * 利用規約同意入力の値を取得する
   * @param input 利用規約同意入力オブジェクト
   * @returns 同意しているかどうかのブール値
   */
  getValue: (input: TermsAgreementInput): boolean => input.value
};
