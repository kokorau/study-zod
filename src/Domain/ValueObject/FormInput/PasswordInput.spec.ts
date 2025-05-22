import { describe, test, expect } from "vitest";
import { $PasswordInput } from "./PasswordInput";
import { ErrorCodes } from "../../../Domain/Error/ErrorCodes";
import type { ValidationError } from "../../../Domain/Error/ValidationError";
import type { Success, Failure } from "../../../Domain/Common/Result";

describe("PasswordInput", () => {
  test("creates a valid PasswordInput with strong password", () => {
    const result = $PasswordInput.create("Password123");
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const passwordInput = (result as Success<any>).value;
      expect($PasswordInput.getValue(passwordInput)).toBe("Password123");
    }
  });
  
  test("rejects empty string with multiple validation errors", () => {
    const result = $PasswordInput.create("");
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(5); // 空の文字列は5つのエラーを返す
      
      // REQUIREDエラーが含まれていることを確認
      const requiredError = errors.find((e: ValidationError) => e.code === ErrorCodes.REQUIRED);
      expect(requiredError).toBeDefined();
      expect(requiredError?.field).toBe("password");
      
      // TOO_SHORTエラーが含まれていることを確認
      const tooShortError = errors.find((e: ValidationError) => e.code === ErrorCodes.TOO_SHORT);
      expect(tooShortError).toBeDefined();
      expect(tooShortError?.field).toBe("password");
      
      // INVALID_FORMATエラーが含まれていることを確認（3つ）
      const formatErrors = errors.filter((e: ValidationError) => e.code === ErrorCodes.INVALID_FORMAT);
      expect(formatErrors.length).toBe(3);
      formatErrors.forEach((error: ValidationError) => {
        expect(error.field).toBe("password");
      });
    }
  });
  
  test("rejects short password with TOO_SHORT error code", () => {
    const result = $PasswordInput.create("Pass1");
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("password");
      expect(errors[0].code).toBe(ErrorCodes.TOO_SHORT);
    }
  });
  
  test("rejects password without uppercase with INVALID_FORMAT error code", () => {
    const result = $PasswordInput.create("password123");
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("password");
      expect(errors[0].code).toBe(ErrorCodes.INVALID_FORMAT);
    }
  });
  
  test("rejects password without lowercase with INVALID_FORMAT error code", () => {
    const result = $PasswordInput.create("PASSWORD123");
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("password");
      expect(errors[0].code).toBe(ErrorCodes.INVALID_FORMAT);
    }
  });
  
  test("rejects password without numbers with INVALID_FORMAT error code", () => {
    const result = $PasswordInput.create("PasswordTest");
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("password");
      expect(errors[0].code).toBe(ErrorCodes.INVALID_FORMAT);
    }
  });
  
  test("getValue returns the password value", () => {
    const result = $PasswordInput.create("Password123");
    
    if (result._tag === "success") {
      const passwordInput = (result as Success<any>).value;
      expect($PasswordInput.getValue(passwordInput)).toBe("Password123");
    }
  });
});
