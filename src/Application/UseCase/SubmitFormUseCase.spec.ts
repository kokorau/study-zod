import { describe, test, expect, vi, beforeEach } from "vitest";
import { createSubmitFormUseCase, submitForm } from "./SubmitFormUseCase";
import { success, failure } from "../../Domain/ValueObject/Result/Result";
import { createValidationError } from "../../Domain/ValueObject/Error/ValidationError";
import { ErrorCodes } from "../../Domain/ValueObject/Error/ErrorCodes";

describe("SubmitFormUseCase", () => {
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
  
  test("execute validates and submits valid form data", async () => {
    mockRepository.validate.mockReturnValue(success(undefined));
    mockRepository.submit.mockResolvedValue(success(undefined));
    
    const useCase = createSubmitFormUseCase(mockRepository);
    const result = await useCase.execute(validFormData);
    
    expect(result._tag).toBe("success");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
    expect(mockRepository.submit).toHaveBeenCalled();
  });
  
  test("execute returns validation errors for invalid form data", async () => {
    const validationErrors = [
      createValidationError("name", ErrorCodes.REQUIRED),
      createValidationError("email", ErrorCodes.INVALID_FORMAT)
    ];
    
    mockRepository.validate.mockReturnValue(failure(validationErrors));
    
    const useCase = createSubmitFormUseCase(mockRepository);
    const result = await useCase.execute(validFormData);
    
    expect(result._tag).toBe("failure");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
    expect(mockRepository.submit).not.toHaveBeenCalled();
    
    if (result._tag === "failure") {
      expect(Array.isArray(result.error)).toBe(true);
      expect(result.error).toEqual(validationErrors);
    }
  });
  
  test("execute handles submission errors", async () => {
    const submissionError = new Error("Submission error");
    
    mockRepository.validate.mockReturnValue(success(undefined));
    mockRepository.submit.mockResolvedValue(failure(submissionError));
    
    const useCase = createSubmitFormUseCase(mockRepository);
    const result = await useCase.execute(validFormData);
    
    expect(result._tag).toBe("failure");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
    expect(mockRepository.submit).toHaveBeenCalled();
    
    if (result._tag === "failure") {
      expect(result.error).toBe(submissionError);
    }
  });
  
  test("execute handles unexpected errors during submission", async () => {
    mockRepository.validate.mockReturnValue(success(undefined));
    mockRepository.submit.mockRejectedValue(new Error("Unexpected error"));
    
    const useCase = createSubmitFormUseCase(mockRepository);
    const result = await useCase.execute(validFormData);
    
    expect(result._tag).toBe("failure");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
    expect(mockRepository.submit).toHaveBeenCalled();
    
    if (result._tag === "failure") {
      expect(result.error).toBeInstanceOf(Error);
      expect((result.error as Error).message).toBe("Unexpected error");
    }
  });
});

describe("submitForm function", () => {
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
  
  test("validates and submits valid form data", async () => {
    mockRepository.validate.mockReturnValue(success(undefined));
    mockRepository.submit.mockResolvedValue(success(undefined));
    
    const result = await submitForm(validFormData, mockRepository);
    
    expect(result._tag).toBe("success");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
    expect(mockRepository.submit).toHaveBeenCalled();
  });
  
  test("returns validation errors for invalid form data", async () => {
    const validationErrors = [
      createValidationError("name", ErrorCodes.REQUIRED),
      createValidationError("email", ErrorCodes.INVALID_FORMAT)
    ];
    
    mockRepository.validate.mockReturnValue(failure(validationErrors));
    
    const result = await submitForm(validFormData, mockRepository);
    
    expect(result._tag).toBe("failure");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
    expect(mockRepository.submit).not.toHaveBeenCalled();
    
    if (result._tag === "failure") {
      expect(Array.isArray(result.error)).toBe(true);
      expect(result.error).toEqual(validationErrors);
    }
  });
  
  test("handles submission errors", async () => {
    const submissionError = new Error("Submission error");
    
    mockRepository.validate.mockReturnValue(success(undefined));
    mockRepository.submit.mockResolvedValue(failure(submissionError));
    
    const result = await submitForm(validFormData, mockRepository);
    
    expect(result._tag).toBe("failure");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
    expect(mockRepository.submit).toHaveBeenCalled();
    
    if (result._tag === "failure") {
      expect(result.error).toBe(submissionError);
    }
  });
  
  test("handles unexpected errors during submission", async () => {
    mockRepository.validate.mockReturnValue(success(undefined));
    mockRepository.submit.mockRejectedValue(new Error("Unexpected error"));
    
    const result = await submitForm(validFormData, mockRepository);
    
    expect(result._tag).toBe("failure");
    expect(mockRepository.validate).toHaveBeenCalledWith(validFormData);
    expect(mockRepository.submit).toHaveBeenCalled();
    
    if (result._tag === "failure") {
      expect(result.error).toBeInstanceOf(Error);
      expect((result.error as Error).message).toBe("Unexpected error");
    }
  });
});
