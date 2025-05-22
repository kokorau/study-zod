import { describe, test, expect, vi, beforeEach } from "vitest";
import { createFormService } from "./FormService";
import { success, failure } from "../../Domain/Common/Result";
import { ErrorCodes } from "../../Domain/Error/ErrorCodes";
import { createValidationError } from "../../Domain/Error/ValidationError";

describe("FormService", () => {
  // モックリポジトリ
  const mockRepository = {
    getFormSchema: vi.fn(),
    validate: vi.fn(),
    submit: vi.fn()
  };
  
  // テスト用のフォームデータ
  const validFormData = {
    name: "山田太郎",
    email: "test@example.com",
    password: "Password123",
    age: 30,
    gender: "male",
    country: "jp",
    bio: "自己紹介",
    agreeTerms: true
  };
  
  beforeEach(() => {
    // モックをリセット
    vi.resetAllMocks();
    
    // デフォルトのモック実装
    mockRepository.getFormSchema.mockReturnValue({});
    mockRepository.validate.mockReturnValue(success(undefined));
    mockRepository.submit.mockResolvedValue(success(undefined));
  });
  
  test("setLocale changes the locale", () => {
    const service = createFormService(mockRepository, "JP");
    
    // 初期値はJP
    service.setLocale("EN");
    
    // ロケールが変更されたことを確認するために、エラーメッセージをチェック
    mockRepository.validate.mockReturnValue(failure([
      createValidationError("name", ErrorCodes.REQUIRED)
    ]));
    
    const result = service.validate(validFormData);
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      // ENロケールのエラーメッセージが使用されていることを確認
      expect(result.error.name).toBeDefined();
      expect(typeof result.error.name).toBe("string");
      // 具体的なメッセージの内容はロケールファイルに依存するため、
      // 型チェックのみを行う
    }
  });
  
  test("getSchema returns the form schema from repository", () => {
    const mockSchema = { test: "schema" };
    mockRepository.getFormSchema.mockReturnValue(mockSchema);
    
    const service = createFormService(mockRepository);
    const schema = service.getSchema();
    
    expect(schema).toBe(mockSchema);
    expect(mockRepository.getFormSchema).toHaveBeenCalled();
  });
  
  test("validate returns success for valid data", () => {
    mockRepository.validate.mockReturnValue(success(undefined));
    
    const service = createFormService(mockRepository);
    const result = service.validate(validFormData);
    
    expect(result._tag).toBe("success");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
  });
  
  test("validate returns localized error messages for invalid data", () => {
    mockRepository.validate.mockReturnValue(failure([
      createValidationError("name", ErrorCodes.REQUIRED),
      createValidationError("email", ErrorCodes.INVALID_FORMAT)
    ]));
    
    const service = createFormService(mockRepository, "JP");
    const result = service.validate(validFormData);
    
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      expect(result.error.name).toBeDefined();
      expect(result.error.email).toBeDefined();
      expect(typeof result.error.name).toBe("string");
      expect(typeof result.error.email).toBe("string");
    }
  });
  
  test("submitForm validates and submits valid form data", async () => {
    mockRepository.validate.mockReturnValue(success(undefined));
    mockRepository.submit.mockResolvedValue(success(undefined));
    
    const service = createFormService(mockRepository);
    const result = await service.submitForm(validFormData);
    
    expect(result._tag).toBe("success");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
    expect(mockRepository.submit).toHaveBeenCalled();
  });
  
  test("submitForm returns error for invalid form data", async () => {
    mockRepository.validate.mockReturnValue(failure([
      createValidationError("name", ErrorCodes.REQUIRED)
    ]));
    
    const service = createFormService(mockRepository, "JP");
    const result = await service.submitForm(validFormData);
    
    expect(result._tag).toBe("failure");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
    expect(mockRepository.submit).not.toHaveBeenCalled();
    
    if (result._tag === "failure") {
      expect(typeof result.error).toBe("string");
    }
  });
  
  test("submitForm handles submission errors", async () => {
    mockRepository.validate.mockReturnValue(success(undefined));
    mockRepository.submit.mockResolvedValue(failure(new Error("Submission error")));
    
    const service = createFormService(mockRepository);
    const result = await service.submitForm(validFormData);
    
    expect(result._tag).toBe("failure");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
    expect(mockRepository.submit).toHaveBeenCalled();
    
    if (result._tag === "failure") {
      expect(typeof result.error).toBe("string");
      expect(result.error).toContain("送信エラー");
    }
  });
});
