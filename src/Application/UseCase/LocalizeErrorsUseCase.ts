import type { ValidationError } from "../../Domain/ValueObject/Error/ValidationError";
import { getLocaleMessages } from "../Locale/FormMessages";

/**
 * エラーローカライズユースケースのインターフェース
 */
export interface LocalizeErrorsUseCase {
  /**
   * バリデーションエラーをローカライズする
   * @param errors バリデーションエラーの配列
   * @returns ローカライズされたエラーメッセージのマップ
   */
  execute(errors: ValidationError[]): Record<string, string>;
}

/**
 * バリデーションエラーをローカライズする
 * @param errors バリデーションエラーの配列
 * @param locale ロケール
 * @returns ローカライズされたエラーメッセージのマップ
 */
export const localizeErrors = (
  errors: ValidationError[],
  locale: "JP" | "EN" = "JP"
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

/**
 * エラーローカライズユースケースを作成する
 * @param locale ロケール
 * @returns エラーローカライズユースケース
 */
export const createLocalizeErrorsUseCase = (
  locale: "JP" | "EN" = "JP"
): LocalizeErrorsUseCase => {
  return {
    execute: (errors: ValidationError[]) => localizeErrors(errors, locale)
  };
};
