import { z } from 'zod';
import { ErrorCodes } from '../../Error/ErrorCodes';
import type { FormInput } from './FormInput';
import { createFormInputFactory, type FormInputUtil, type StringInput } from './FormInputFactory';

/**
 * メールアドレス入力を表現する型
 */
export type EmailInput = FormInput<string>;

/**
 * メールアドレス入力のバリデーションスキーマを定義
 */
const emailSchema = () => z.string()
  .min(1, {
    message: ErrorCodes.REQUIRED
  })
  .email({
    message: ErrorCodes.INVALID_FORMAT
  });

/**
 * メールアドレス入力に関する操作を提供するオブジェクト
 */
export const $EmailInput: FormInputUtil<EmailInput, StringInput> = createFormInputFactory<string, string>(
  emailSchema,
  'email'
);
