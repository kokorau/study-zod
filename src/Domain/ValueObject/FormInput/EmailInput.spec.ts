import { describe, test, expect } from "vitest";
import { $EmailInput } from "./EmailInput";
import { ErrorCodes } from "../../../Domain/Error/ErrorCodes";
import type { ValidationError } from "../../../Domain/Error/ValidationError";
import type { Success, Failure } from "../../../Domain/Common/Result";

describe("EmailInput", () => {
  test("creates a valid EmailInput with valid email", () => {
    const result = $EmailInput.create("test@example.com");
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const emailInput = (result as Success<any>).value;
      expect($EmailInput.getValue(emailInput)).toBe("test@example.com");
    }
  });
  
  test("rejects empty string with validation errors", () => {
    const result = $EmailInput.create("");
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(2); // 空の文字列は2つのエラーを返す
      
      // REQUIREDエラーが含まれていることを確認
      const requiredError = errors.find((e: ValidationError) => e.code === ErrorCodes.REQUIRED);
      expect(requiredError).toBeDefined();
      expect(requiredError?.field).toBe("email");
      
      // INVALID_FORMATエラーが含まれていることを確認
      const formatError = errors.find((e: ValidationError) => e.code === ErrorCodes.INVALID_FORMAT);
      expect(formatError).toBeDefined();
      expect(formatError?.field).toBe("email");
    }
  });
  
  test("rejects invalid email format with INVALID_FORMAT error code", () => {
    const result = $EmailInput.create("invalid-email");
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("email");
      expect(errors[0].code).toBe(ErrorCodes.INVALID_FORMAT);
    }
  });
  
  test("getValue returns the email value", () => {
    const result = $EmailInput.create("test@example.com");
    
    if (result._tag === "success") {
      const emailInput = (result as Success<any>).value;
      expect($EmailInput.getValue(emailInput)).toBe("test@example.com");
    }
  });
});
