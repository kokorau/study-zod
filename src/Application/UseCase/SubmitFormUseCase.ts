import type { FormRepository } from "../../Domain/Repository/FormRepository";
import type { RegistrationFormData } from "../../Domain/ValueObject/FormObject/RegistrationForm";
import { $RegistrationForm } from "../../Domain/ValueObject/FormObject/RegistrationForm";
import type { Result } from "../../Domain/Common/Result";
import { failure } from "../../Domain/Common/Result";
import type { ValidationError } from "../../Domain/Error/ValidationError";

/**
 * フォーム送信ユースケースのインターフェース
 */
export interface SubmitFormUseCase {
  /**
   * フォームを検証して送信する
   * @param data フォームデータ
   * @returns 送信結果。成功した場合は void、失敗した場合はエラーメッセージ
   */
  execute(
    data: RegistrationFormData,
  ): Promise<Result<void, ValidationError[] | Error>>;
}

/**
 * フォーム送信ユースケースを作成する
 * @param repository フォームリポジトリ
 * @returns フォーム送信ユースケース
 */
export const createSubmitFormUseCase = (
  repository: FormRepository,
): SubmitFormUseCase => {
  return {
    /**
     * フォームを検証して送信する
     * @param data フォームデータ
     * @returns 送信結果。成功した場合は void、失敗した場合はエラーメッセージ
     */
    execute: async (
      data: RegistrationFormData,
    ): Promise<Result<void, ValidationError[] | Error>> => {
      // フォームの検証
      const validationResult = repository.validate(data);

      if (validationResult._tag === "failure") {
        return validationResult;
      }

      // フォームオブジェクトの作成
      const formResult = $RegistrationForm.create(data);

      if (formResult._tag === "failure") {
        return formResult;
      }

      // フォームの送信
      try {
        const submitResult = await repository.submit(formResult.value);
        return submitResult;
      } catch (error) {
        return failure(
          error instanceof Error ? error : new Error("Unknown error"),
        );
      }
    },
  };
};
