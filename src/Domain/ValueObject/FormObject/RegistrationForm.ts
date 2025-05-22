import { z } from 'zod';
import type { Result } from '../../Common/Result';
import { success, failure } from '../../Common/Result';
import type { ValidationError } from '../../Error/ValidationError';

import type { NameField } from '../FormField/NameField';
import { $NameField } from '../FormField/NameField';
import type { EmailField } from '../FormField/EmailField';
import { $EmailField } from '../FormField/EmailField';
import type { PasswordField } from '../FormField/PasswordField';
import { $PasswordField } from '../FormField/PasswordField';
import type { AgeField } from '../FormField/AgeField';
import { $AgeField } from '../FormField/AgeField';
import type { GenderField } from '../FormField/GenderField';
import { $GenderField } from '../FormField/GenderField';
import type { CountryField } from '../FormField/CountryField';
import { $CountryField } from '../FormField/CountryField';
import type { BioField } from '../FormField/BioField';
import { $BioField } from '../FormField/BioField';
import type { TermsAgreementField } from '../FormField/TermsAgreementField';
import { $TermsAgreementField } from '../FormField/TermsAgreementField';
import type { ExtractFormDataType } from '../FormField/FormFieldFactory';

/**
 * 登録フォームを表現するインターフェース
 */
export interface RegistrationForm {
  readonly name: NameField;
  readonly email: EmailField;
  readonly password: PasswordField;
  readonly age: AgeField;
  readonly gender: GenderField;
  readonly country: CountryField;
  readonly bio: BioField;
  readonly agreeTerms: TermsAgreementField;
}

/**
 * 登録フォームの操作オブジェクトの型
 */
export type RegistrationFormOperations = {
  name: typeof $NameField;
  email: typeof $EmailField;
  password: typeof $PasswordField;
  age: typeof $AgeField;
  gender: typeof $GenderField;
  country: typeof $CountryField;
  bio: typeof $BioField;
  agreeTerms: typeof $TermsAgreementField;
};

/**
 * 登録フォームの入力データ型
 * 各Fieldのvalueプロパティの型から自動的に導出
 * テストとの互換性のためにstring型も許容
 */
export type RegistrationFormData = ExtractFormDataType<RegistrationFormOperations>;

/**
 * 登録フォームに関する操作を提供するオブジェクト
 */
export const $RegistrationForm = {
  /**
   * 登録フォームのバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => z.object({
    name: $NameField.schema(),
    email: $EmailField.schema(),
    password: $PasswordField.schema(),
    age: $AgeField.schema(),
    gender: $GenderField.schema(),
    country: $CountryField.schema(),
    bio: $BioField.schema(),
    agreeTerms: $TermsAgreementField.schema()
  }),
  
  /**
   * 登録フォームを作成する
   * @param data フォーム入力データ
   * @returns 成功した場合はRegistrationFormオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (data: RegistrationFormData): Result<RegistrationForm, ValidationError[]> => {
    // 各フィールドを個別に検証
    const nameResult = $NameField.create(data.name);
    const emailResult = $EmailField.create(data.email);
    const passwordResult = $PasswordField.create(data.password);
    const ageResult = $AgeField.create(data.age);
    const genderResult = $GenderField.create(data.gender);
    const countryResult = $CountryField.create(data.country);
    const bioResult = $BioField.create(data.bio);
    const agreeTermsResult = $TermsAgreementField.create(data.agreeTerms);
    
    // すべてのエラーを収集
    const errors: ValidationError[] = [];
    if (nameResult._tag === 'failure') errors.push(...nameResult.error);
    if (emailResult._tag === 'failure') errors.push(...emailResult.error);
    if (passwordResult._tag === 'failure') errors.push(...passwordResult.error);
    if (ageResult._tag === 'failure') errors.push(...ageResult.error);
    if (genderResult._tag === 'failure') errors.push(...genderResult.error);
    if (countryResult._tag === 'failure') errors.push(...countryResult.error);
    if (bioResult._tag === 'failure') errors.push(...bioResult.error);
    if (agreeTermsResult._tag === 'failure') errors.push(...agreeTermsResult.error);
    
    // エラーがある場合は失敗を返す
    if (errors.length > 0) {
      return failure(errors);
    }
    
    // すべての検証が成功した場合はフォームオブジェクトを作成
    return success({
      name: (nameResult as any).value,
      email: (emailResult as any).value,
      password: (passwordResult as any).value,
      age: (ageResult as any).value,
      gender: (genderResult as any).value,
      country: (countryResult as any).value,
      bio: (bioResult as any).value,
      agreeTerms: (agreeTermsResult as any).value
    });
  },
  
  /**
   * 登録フォームをDTOに変換する
   * @param form 登録フォームオブジェクト
   * @returns DTOオブジェクト
   */
  toDTO: (form: RegistrationForm) => ({
    name: $NameField.getValue(form.name),
    email: $EmailField.getValue(form.email),
    password: $PasswordField.getValue(form.password),
    age: $AgeField.getValue(form.age),
    gender: $GenderField.getValue(form.gender),
    country: $CountryField.getValue(form.country),
    bio: $BioField.getValue(form.bio),
    agreeTerms: $TermsAgreementField.getValue(form.agreeTerms)
  })
};
