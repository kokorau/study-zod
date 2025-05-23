import type { FormRepository } from "../../Domain/Repository/FormRepository";
import type { RegistrationFormData } from "../../Domain/ValueObject/FormObject/RegistrationForm";
import type { Result } from "../../Domain/Common/Result";
import { success, failure, match } from "../../Domain/Common/Result";
import type { ValidationError } from "../../Domain/Error/ValidationError";
import { createFormRepository } from "../../Infrastructure/Repository/FormRepositoryImpl";
import { localizeErrors } from "./LocalizeErrorsUseCase";

/**
 * フォーム検証ユースケースのインターフェース
 */
export interface ValidateFormUseCase {
  /**
   * フォームデータを検証する
   * @param data 検証するデータ
   * @returns 検証結果。成功した場合は void、失敗した場合はローカライズされたエラーメッセージのマップ
   */
  execute(data: RegistrationFormData): Result<void, Record<string, string>>;
}

/**
 * フォームデータを検証する
 * @param data 検証するデータ
 * @param repository フォームリポジトリ（省略可能、デフォルトはcreateFormRepository()の結果）
 * @param locale ロケール（省略可能、デフォルトは"JP"）
 * @returns 検証結果。成功した場合は void、失敗した場合はローカライズされたエラーメッセージのマップ
 */
export const validateForm = (
  data: RegistrationFormData,
  repository: FormRepository = createFormRepository(),
  locale: "JP" | "EN" = "JP"
): Result<void, Record<string, string>> => {
  const result = repository.validate(data);

  return match<
    void,
    ValidationError[],
    Result<void, Record<string, string>>
  >(
    result,
    () => success(undefined),
    (errors) => failure(localizeErrors(errors, locale)),
  );
};

/**
 * フォーム検証ユースケースを作成する
 * @param repository フォームリポジトリ
 * @param locale ロケール
 * @returns フォーム検証ユースケース
 */
export const createValidateFormUseCase = (
  repository: FormRepository = createFormRepository(),
  locale: "JP" | "EN" = "JP"
): ValidateFormUseCase => {
  return {
    execute: (data: RegistrationFormData) => validateForm(data, repository, locale)
  };
};
