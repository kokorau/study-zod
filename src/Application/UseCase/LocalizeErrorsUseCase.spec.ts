import { describe, test, expect, vi } from "vitest";
import { localizeErrors, createLocalizeErrorsUseCase } from "./LocalizeErrorsUseCase";
import { ErrorCodes } from "../../Domain/ValueObject/Error/ErrorCodes";
import type { ErrorCode } from "../../Domain/ValueObject/Error/ErrorCodes";
import { createValidationError } from "../../Domain/ValueObject/Error/ValidationError";

// getLocaleMessagesのモック
vi.mock("../Locale/FormMessages", () => ({
  getLocaleMessages: () => ({
    JP: {
      "name.required": "名前は必須です",
      "email.invalid_format": "メールアドレスの形式が正しくありません",
      "form.invalid": "フォームに入力エラーがあります"
    },
    EN: {
      "name.required": "Name is required",
      "email.invalid_format": "Email format is invalid",
      "form.invalid": "There are errors in the form"
    }
  })
}));

describe("LocalizeErrorsUseCase", () => {
  // テスト用のバリデーションエラー
  const validationErrors = [
    createValidationError("name", ErrorCodes.REQUIRED),
    createValidationError("email", ErrorCodes.INVALID_FORMAT)
  ];
  
  test("localizes errors with JP locale", () => {
    const useCase = createLocalizeErrorsUseCase("JP");
    const result = useCase.execute(validationErrors);
    
    expect(result.name).toBe("名前は必須です");
    expect(result.email).toBe("メールアドレスの形式が正しくありません");
  });
  
  test("localizes errors with EN locale", () => {
    const useCase = createLocalizeErrorsUseCase("EN");
    const result = useCase.execute(validationErrors);
    
    expect(result.name).toBe("Name is required");
    expect(result.email).toBe("Email format is invalid");
  });
  
  test("handles unknown error codes", () => {
    const unknownErrors = [
      createValidationError("unknown", "UNKNOWN_CODE" as ErrorCode)
    ];
    
    const useCase = createLocalizeErrorsUseCase("JP");
    const result = useCase.execute(unknownErrors);
    
    expect(result.unknown).toBe("Error: UNKNOWN_CODE");
  });
});

describe("localizeErrors function", () => {
  // テスト用のバリデーションエラー
  const validationErrors = [
    createValidationError("name", ErrorCodes.REQUIRED),
    createValidationError("email", ErrorCodes.INVALID_FORMAT)
  ];
  
  test("localizes errors with JP locale", () => {
    const result = localizeErrors(validationErrors, "JP");
    
    expect(result.name).toBe("名前は必須です");
    expect(result.email).toBe("メールアドレスの形式が正しくありません");
  });
  
  test("localizes errors with EN locale", () => {
    const result = localizeErrors(validationErrors, "EN");
    
    expect(result.name).toBe("Name is required");
    expect(result.email).toBe("Email format is invalid");
  });
  
  test("uses JP locale by default", () => {
    const result = localizeErrors(validationErrors);
    
    expect(result.name).toBe("名前は必須です");
    expect(result.email).toBe("メールアドレスの形式が正しくありません");
  });
  
  test("handles unknown error codes", () => {
    const unknownErrors = [
      createValidationError("unknown", "UNKNOWN_CODE" as ErrorCode)
    ];
    
    const result = localizeErrors(unknownErrors);
    
    expect(result.unknown).toBe("Error: UNKNOWN_CODE");
  });
});
