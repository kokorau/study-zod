import { describe, test, expect, vi, beforeEach } from "vitest";
import { createFormRepository } from "./FormRepositoryImpl";
import { $RegistrationForm } from "../../Domain/ValueObject/FormObject/RegistrationForm";
import { ErrorCodes } from "../../Domain/Error/ErrorCodes";

describe("FormRepositoryImpl", () => {
  let repository: ReturnType<typeof createFormRepository>;
  
  beforeEach(() => {
    repository = createFormRepository();
    // コンソールログをモック化
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });
  
  test("getFormSchema returns the registration form schema", () => {
    const schema = repository.getFormSchema();
    expect(schema).toBeDefined();
    expect(typeof schema.parse).toBe("function");
  });
  
  test("validate returns success for valid data", () => {
    const validData = {
      name: "山田太郎",
      email: "test@example.com",
      password: "Password123",
      age: 30,
      gender: "male",
      country: "jp",
      bio: "自己紹介",
      agreeTerms: true
    };
    
    const result = repository.validate(validData);
    expect(result._tag).toBe("success");
  });
  
  test("validate returns failure with errors for invalid data", () => {
    const invalidData = {
      name: "",
      email: "invalid-email",
      password: "weak",
      age: -1,
      gender: "",
      country: "",
      bio: "",
      agreeTerms: false
    };
    
    const result = repository.validate(invalidData);
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      expect(result.error.length).toBeGreaterThan(0);
      
      // 名前のエラーを確認
      const nameError = result.error.find(e => e.field === "name");
      expect(nameError).toBeDefined();
      expect(nameError?.code).toBe(ErrorCodes.REQUIRED);
    }
  });
  
  test("submit returns success for valid form", async () => {
    const validData = {
      name: "山田太郎",
      email: "test@example.com",
      password: "Password123",
      age: 30,
      gender: "male",
      country: "jp",
      bio: "自己紹介",
      agreeTerms: true
    };
    
    const formResult = $RegistrationForm.create(validData);
    expect(formResult._tag).toBe("success");
    
    if (formResult._tag === "success") {
      const result = await repository.submit(formResult.value);
      expect(result._tag).toBe("success");
      expect(console.log).toHaveBeenCalled();
    }
  });
  
  test("submit handles errors gracefully", async () => {
    const validData = {
      name: "山田太郎",
      email: "test@example.com",
      password: "Password123",
      age: 30,
      gender: "male",
      country: "jp",
      bio: "自己紹介",
      agreeTerms: true
    };
    
    const formResult = $RegistrationForm.create(validData);
    expect(formResult._tag).toBe("success");
    
    if (formResult._tag === "success") {
      // コンソールログでエラーをスローするようにモック化
      vi.spyOn(console, 'log').mockImplementation(() => {
        throw new Error("Test error");
      });
      
      const result = await repository.submit(formResult.value);
      expect(result._tag).toBe("failure");
      if (result._tag === "failure") {
        expect(result.error).toBeInstanceOf(Error);
        expect(result.error.message).toBe("Test error");
      }
    }
  });
});
