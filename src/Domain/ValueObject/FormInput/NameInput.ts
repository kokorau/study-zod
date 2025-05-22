import { z } from 'zod';
import { ErrorCodes } from '../../Error/ErrorCodes';
import type { FormInput } from './FormInput';
import { createFormInputFactory, type FormInputUtil, type StringInput } from './FormInputFactory';

/**
 * 名前入力を表現する型
 */
export type NameInput = FormInput<string>;

/**
 * 名前入力のバリデーションスキーマを定義
 */
const nameSchema = () => z.string().min(1, {
  message: ErrorCodes.REQUIRED
});

/**
 * 名前入力に関する操作を提供するオブジェクト
 */
export const $NameInput: FormInputUtil<NameInput, StringInput> = createFormInputFactory<string, string>(
  nameSchema,
  'name'
);
