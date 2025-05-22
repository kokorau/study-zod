import type { z } from 'zod';
import type { Result } from '../Common/Result';
import type { ValidationError } from '../Error/ValidationError';
import type { RegistrationForm } from '../ValueObject/FormObject/RegistrationForm';

/**
 * フォームリポジトリのインターフェース
 * フォームに関するデータアクセスと操作を抽象化する
 */
export interface FormRepository {
  /**
   * フォームのスキーマを取得する
   * @returns Zodスキーマオブジェクト
   */
  getFormSchema(): z.ZodObject<any>;
  
  /**
   * フォームデータを検証する
   * @param data 検証するデータ
   * @returns 検証結果。成功した場合は void、失敗した場合はバリデーションエラーの配列
   */
  validate(data: any): Result<void, ValidationError[]>;
  
  /**
   * フォームを送信する
   * @param form 送信するフォームオブジェクト
   * @returns 送信結果。成功した場合は void、失敗した場合はエラー
   */
  submit(form: RegistrationForm): Promise<Result<void, Error>>;
}
