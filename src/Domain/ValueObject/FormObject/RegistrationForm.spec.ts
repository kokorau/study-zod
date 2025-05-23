import { describe, test, expect } from "vitest";
import { $RegistrationForm } from "./RegistrationForm";
import type { Success, Failure } from "../Result/Result";
import { ErrorCodes } from "../Error/ErrorCodes";
import type { ValidationError } from "../Error/ValidationError";

describe("RegistrationForm", () => {
  test("creates a valid RegistrationForm with valid data", () => {
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
    
    const result = $RegistrationForm.create(validData);
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const form = (result as Success<any>).value;
      const dto = $RegistrationForm.toDTO(form);
      
      expect(dto.name).toBe("山田太郎");
      expect(dto.email).toBe("test@example.com");
      expect(dto.password).toBe("Password123");
      expect(dto.age).toBe(30);
      expect(dto.gender).toBe("male");
      expect(dto.country).toBe("jp");
      expect(dto.bio).toBe("自己紹介");
      expect(dto.agreeTerms).toBe(true);
    }
  });
  
  test("rejects invalid data and collects all errors", () => {
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
    
    const result = $RegistrationForm.create(invalidData);
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      
      // 少なくとも5つのエラーがあることを確認
      expect(errors.length).toBeGreaterThanOrEqual(5);
      
      // 名前のエラーを確認
      const nameError = errors.find((e: ValidationError) => e.field === "name");
      expect(nameError).toBeDefined();
      expect(nameError?.code).toBe(ErrorCodes.REQUIRED);
      
      // メールアドレスのエラーを確認
      const emailError = errors.find((e: ValidationError) => e.field === "email");
      expect(emailError).toBeDefined();
      
      // パスワードのエラーを確認
      const passwordError = errors.find((e: ValidationError) => e.field === "password");
      expect(passwordError).toBeDefined();
      
      // 利用規約同意のエラーを確認
      const agreeTermsError = errors.find((e: ValidationError) => e.field === "agreeTerms");
      expect(agreeTermsError).toBeDefined();
      expect(agreeTermsError?.code).toBe(ErrorCodes.REQUIRED);
    }
  });
  
  test("toDTO converts RegistrationForm to DTO", () => {
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
    
    const result = $RegistrationForm.create(validData);
    
    if (result._tag === "success") {
      const form = (result as Success<any>).value;
      const dto = $RegistrationForm.toDTO(form);
      
      expect(dto).toEqual(validData);
    }
  });
});
