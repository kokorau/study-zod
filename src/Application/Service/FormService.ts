import type { FormRepository } from "../../Domain/Repository/FormRepository";
import type {
  RegistrationForm,
  RegistrationFormData,
} from "../../Domain/ValueObject/FormObject/RegistrationForm";
import { $RegistrationForm } from "../../Domain/ValueObject/FormObject/RegistrationForm";
import type { Result } from "../../Domain/Common/Result";
import { success, failure, match } from "../../Domain/Common/Result";
import type { ValidationError } from "../../Domain/Error/ValidationError";
import { getLocaleMessages } from "../Locale/FormMessages";

/**
 * フォームサービスのインターフェース
 */
export interface FormService {
  /**
   * ロケールを設定する
   * @param locale ロケール
   */
  setLocale(locale: "JP" | "EN"): void;

  /**
   * フォームスキーマを取得する
   * @returns フォームスキーマ
   */
  getSchema(): any;

  /**
   * フォームデータを検証する
   * @param data 検証するデータ
   * @returns 検証結果。成功した場合は void、失敗した場合はローカライズされたエラーメッセージのマップ
   */
  validate(data: RegistrationFormData): Result<void, Record<string, string>>;

  /**
   * フォームを送信する
   * @param data 送信するデータ
   * @returns 送信結果。成功した場合は void、失敗した場合はエラーメッセージ
   */
  submitForm(data: RegistrationFormData): Promise<Result<void, string>>;
}

/**
 * フォームサービスを作成する
 * @param repository フォームリポジトリ
 * @param initialLocale 初期ロケール
 * @returns フォームサービスインターフェースを実装したオブジェクト
 */
export const createFormService = (
  repository: FormRepository,
  initialLocale: "JP" | "EN" = "JP",
): FormService => {
  // 現在のロケール
  let locale = initialLocale;

  /**
   * バリデーションエラーをローカライズする
   * @param errors バリデーションエラーの配列
   * @returns ローカライズされたエラーメッセージのマップ
   */
  const localizeErrors = (
    errors: ValidationError[],
  ): Record<string, string> => {
    const messages = getLocaleMessages()[locale];
    const localizedErrors: Record<string, string> = {};

    errors.forEach((error) => {
      const messageKey = `${error.field}.${error.code}`;
      localizedErrors[error.field] =
        messages[messageKey] || `Error: ${error.code}`;
    });

    return localizedErrors;
  };

  return {
    /**
     * ロケールを設定する
     * @param newLocale ロケール
     */
    setLocale: (newLocale: "JP" | "EN") => {
      locale = newLocale;
    },

    /**
     * フォームスキーマを取得する
     * @returns フォームスキーマ
     */
    getSchema: () => {
      return repository.getFormSchema();
    },

    /**
     * フォームデータを検証する
     * @param data 検証するデータ
     * @returns 検証結果。成功した場合は void、失敗した場合はローカライズされたエラーメッセージのマップ
     */
    validate: (
      data: RegistrationFormData,
    ): Result<void, Record<string, string>> => {
      const result = repository.validate(data);

      return match<
        void,
        ValidationError[],
        Result<void, Record<string, string>>
      >(
        result,
        () => success(undefined),
        (errors) => failure(localizeErrors(errors)),
      );
    },

    /**
     * フォームを送信する
     * @param data 送信するデータ
     * @returns 送信結果。成功した場合は void、失敗した場合はエラーメッセージ
     */
    submitForm: async (
      data: RegistrationFormData,
    ): Promise<Result<void, string>> => {
      // まず検証
      const validationResult = repository.validate(data);

      return await match<
        void,
        ValidationError[],
        Promise<Result<void, string>>
      >(
        validationResult,
        async () => {
          // 検証成功の場合、フォームオブジェクトを作成して送信
          const formResult = $RegistrationForm.create(data);

          return await match<
            RegistrationForm,
            ValidationError[],
            Promise<Result<void, string>>
          >(
            formResult,
            async (form) => {
              const submitResult = await repository.submit(form);

              return match<void, Error, Result<void, string>>(
                submitResult,
                () => success(undefined),
                (error) => failure(`送信エラー: ${error.message}`),
              );
            },
            (_errors) =>
              Promise.resolve(
                failure(getLocaleMessages()[locale]["form.invalid"]),
              ),
          );
        },
        (_errors) =>
          Promise.resolve(failure(getLocaleMessages()[locale]["form.invalid"])),
      );
    },
  };
};
