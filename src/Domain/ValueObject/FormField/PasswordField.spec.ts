import { describe, test, expect } from "vitest";
import { $PasswordField } from "./PasswordField.ts";
import { ErrorCodes } from "../Error/ErrorCodes.ts";
import type { ValidationError } from "../Error/ValidationError.ts";
import type { Success, Failure } from "../Result/Result.ts";

describe("PasswordField", () => {
  test("creates a valid PasswordField with strong password", () => {
    const result = $PasswordField.create("Password123");
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const passwordInput = (result as Success<any>).value;
      expect($PasswordField.getValue(passwordInput)).toBe("Password123");
    }
  });

  test("rejects empty string with multiple validation errors", () => {
    const result = $PasswordField.create("");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(5); // 空の文字列は5つのエラーを返す

      // REQUIREDエラーが含まれていることを確認
      const requiredError = errors.find(
        (e: ValidationError) => e.code === ErrorCodes.REQUIRED,
      );
      expect(requiredError).toBeDefined();
      expect(requiredError?.field).toBe("password");

      // TOO_SHORTエラーが含まれていることを確認
      const tooShortError = errors.find(
        (e: ValidationError) => e.code === ErrorCodes.TOO_SHORT,
      );
      expect(tooShortError).toBeDefined();
      expect(tooShortError?.field).toBe("password");

      // INVALID_FORMATエラーが含まれていることを確認（3つ）
      const formatErrors = errors.filter(
        (e: ValidationError) => e.code === ErrorCodes.INVALID_FORMAT,
      );
      expect(formatErrors.length).toBe(3);
      formatErrors.forEach((error: ValidationError) => {
        expect(error.field).toBe("password");
      });
    }
  });

  test("rejects short password with TOO_SHORT error code", () => {
    const result = $PasswordField.create("Pass1");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("password");
      expect(errors[0].code).toBe(ErrorCodes.TOO_SHORT);
    }
  });

  test("rejects password without uppercase with INVALID_FORMAT error code", () => {
    const result = $PasswordField.create("password123");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("password");
      expect(errors[0].code).toBe(ErrorCodes.INVALID_FORMAT);
    }
  });

  test("rejects password without lowercase with INVALID_FORMAT error code", () => {
    const result = $PasswordField.create("PASSWORD123");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("password");
      expect(errors[0].code).toBe(ErrorCodes.INVALID_FORMAT);
    }
  });

  test("rejects password without numbers with INVALID_FORMAT error code", () => {
    const result = $PasswordField.create("PasswordTest");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("password");
      expect(errors[0].code).toBe(ErrorCodes.INVALID_FORMAT);
    }
  });

  test("getValue returns the password value", () => {
    const result = $PasswordField.create("Password123");

    if (result._tag === "success") {
      const passwordInput = (result as Success<any>).value;
      expect($PasswordField.getValue(passwordInput)).toBe("Password123");
    }
  });
});
