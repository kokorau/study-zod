import type { FormRepository } from "../../Domain/Repository/Form/FormRepository.ts";
import type { RegistrationForm } from "../../Domain/ValueObject/FormObject/RegistrationForm";
import { $RegistrationForm } from "../../Domain/ValueObject/FormObject/RegistrationForm";
import type { Result } from "../../Domain/ValueObject/Result/Result";
import { success, failure } from "../../Domain/ValueObject/Result/Result";
import type { ValidationError } from "../../Domain/ValueObject/Error/ValidationError";
// FormInputからFormFieldに変更

/**
 * フォームリポジトリの実装
 * @returns FormRepositoryインターフェースを実装したオブジェクト
 */
export const createFormRepository = (): FormRepository => {
  return {
    /**
     * フォームのスキーマを取得する
     * @returns Zodスキーマオブジェクト
     */
    getFormSchema: () => {
      return $RegistrationForm.schema();
    },

    /**
     * フォームデータを検証する
     * @param data 検証するデータ
     * @returns 検証結果。成功した場合は void、失敗した場合はバリデーションエラーの配列
     */
    validate: (data: any): Result<void, ValidationError[]> => {
      const formResult = $RegistrationForm.create(data);
      if (formResult._tag === "failure") {
        return formResult as Result<any, ValidationError[]>;
      }
      return success(undefined);
    },

    /**
     * フォームを送信する
     * @param form 送信するフォームオブジェクト
     * @returns 送信結果。成功した場合は void、失敗した場合はエラー
     */
    submit: async (form: RegistrationForm): Promise<Result<void, Error>> => {
      try {
        // API送信をシミュレート
        console.log("フォーム送信:", $RegistrationForm.toDTO(form));

        // 実際のAPIリクエストはここに実装する
        // 例: const response = await fetch('/api/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify($RegistrationForm.toDTO(form))
        // });

        // 成功を返す
        return success(undefined);
      } catch (error) {
        // エラーを返す
        return failure(
          error instanceof Error ? error : new Error("Unknown error"),
        );
      }
    },
  };
};
