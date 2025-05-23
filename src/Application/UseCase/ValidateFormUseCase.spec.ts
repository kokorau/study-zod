import { describe, test, expect, vi, beforeEach } from "vitest";
import { validateForm, createValidateFormUseCase } from "./ValidateFormUseCase";
import { success, failure } from "../../Domain/Common/Result";
import { ErrorCodes } from "../../Domain/Error/ErrorCodes";
import { createValidationError } from "../../Domain/Error/ValidationError";

describe("ValidateFormUseCase", () => {
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
  
  test("validate returns success for valid data", () => {
    mockRepository.validate.mockReturnValue(success(undefined));
    
    const useCase = createValidateFormUseCase(mockRepository);
    const result = useCase.execute(validFormData);
    
    expect(result._tag).toBe("success");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
  });
  
  test("validate returns localized error messages for invalid data", () => {
    mockRepository.validate.mockReturnValue(failure([
      createValidationError("name", ErrorCodes.REQUIRED),
      createValidationError("email", ErrorCodes.INVALID_FORMAT)
    ]));
    
    const useCase = createValidateFormUseCase(mockRepository, "JP");
    const result = useCase.execute(validFormData);
    
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      expect(result.error.name).toBeDefined();
      expect(result.error.email).toBeDefined();
      expect(typeof result.error.name).toBe("string");
      expect(typeof result.error.email).toBe("string");
    }
  });
});

describe("validateForm function", () => {
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
  
  test("returns success for valid data", () => {
    mockRepository.validate.mockReturnValue(success(undefined));
    
    const result = validateForm(validFormData, mockRepository, "JP");
    
    expect(result._tag).toBe("success");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
  });
  
  test("returns localized error messages for invalid data", () => {
    mockRepository.validate.mockReturnValue(failure([
      createValidationError("name", ErrorCodes.REQUIRED),
      createValidationError("email", ErrorCodes.INVALID_FORMAT)
    ]));
    
    const result = validateForm(validFormData, mockRepository, "JP");
    
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      expect(result.error.name).toBeDefined();
      expect(result.error.email).toBeDefined();
      expect(typeof result.error.name).toBe("string");
      expect(typeof result.error.email).toBe("string");
    }
  });
});
