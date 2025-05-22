import { z } from 'zod';
import type { Result } from '../../Common/Result';
import { success, failure } from '../../Common/Result';
import type { ValidationError } from '../../Error/ValidationError';

import type { NameInput } from '../FormInput/NameInput';
import { $NameInput } from '../FormInput/NameInput';
import type { EmailInput } from '../FormInput/EmailInput';
import { $EmailInput } from '../FormInput/EmailInput';
import type { PasswordInput } from '../FormInput/PasswordInput';
import { $PasswordInput } from '../FormInput/PasswordInput';
import type { AgeInput } from '../FormInput/AgeInput';
import { $AgeInput } from '../FormInput/AgeInput';
import type { GenderInput } from '../FormInput/GenderInput';
import { $GenderInput } from '../FormInput/GenderInput';
import type { CountryInput } from '../FormInput/CountryInput';
import { $CountryInput } from '../FormInput/CountryInput';
import type { BioInput } from '../FormInput/BioInput';
import { $BioInput } from '../FormInput/BioInput';
import type { TermsAgreementInput } from '../FormInput/TermsAgreementInput';
import { $TermsAgreementInput } from '../FormInput/TermsAgreementInput';

/**
 * 登録フォームを表現するインターフェース
 */
export interface RegistrationForm {
  readonly name: NameInput;
  readonly email: EmailInput;
  readonly password: PasswordInput;
  readonly age: AgeInput;
  readonly gender: GenderInput;
  readonly country: CountryInput;
  readonly bio: BioInput;
  readonly agreeTerms: TermsAgreementInput;
}

/**
 * 登録フォームの入力データ型
 */
export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  age: number | string;
  gender: string;
  country: string;
  bio?: string;
  agreeTerms: boolean | string;
}

/**
 * 登録フォームに関する操作を提供するオブジェクト
 */
export const $RegistrationForm = {
  /**
   * 登録フォームのバリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => z.object({
    name: $NameInput.schema(),
    email: $EmailInput.schema(),
    password: $PasswordInput.schema(),
    age: $AgeInput.schema(),
    gender: $GenderInput.schema(),
    country: $CountryInput.schema(),
    bio: $BioInput.schema(),
    agreeTerms: $TermsAgreementInput.schema()
  }),
  
  /**
   * 登録フォームを作成する
   * @param data フォーム入力データ
   * @returns 成功した場合はRegistrationFormオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (data: RegistrationFormData): Result<RegistrationForm, ValidationError[]> => {
    // 各フィールドを個別に検証
    const nameResult = $NameInput.create(data.name);
    const emailResult = $EmailInput.create(data.email);
    const passwordResult = $PasswordInput.create(data.password);
    const ageResult = $AgeInput.create(data.age);
    const genderResult = $GenderInput.create(data.gender);
    const countryResult = $CountryInput.create(data.country);
    const bioResult = $BioInput.create(data.bio);
    const agreeTermsResult = $TermsAgreementInput.create(data.agreeTerms);
    
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
    name: $NameInput.getValue(form.name),
    email: $EmailInput.getValue(form.email),
    password: $PasswordInput.getValue(form.password),
    age: $AgeInput.getValue(form.age),
    gender: $GenderInput.getValue(form.gender),
    country: $CountryInput.getValue(form.country),
    bio: $BioInput.getValue(form.bio),
    agreeTerms: $TermsAgreementInput.getValue(form.agreeTerms)
  })
};
