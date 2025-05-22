import { describe, test, expect } from "vitest";
import { $GenderInput, GenderEnum } from "./GenderInput";
import { ErrorCodes } from "../../../Domain/Error/ErrorCodes";
import type { Success, Failure } from "../../../Domain/Common/Result";

describe("GenderInput", () => {
  test("creates a valid GenderInput with male value", () => {
    const result = $GenderInput.create(GenderEnum.MALE);
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const genderInput = (result as Success<any>).value;
      expect($GenderInput.getValue(genderInput)).toBe(GenderEnum.MALE);
    }
  });
  
  test("creates a valid GenderInput with female value", () => {
    const result = $GenderInput.create(GenderEnum.FEMALE);
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const genderInput = (result as Success<any>).value;
      expect($GenderInput.getValue(genderInput)).toBe(GenderEnum.FEMALE);
    }
  });
  
  test("rejects empty string with REQUIRED error code", () => {
    const result = $GenderInput.create("");
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("gender");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });
  
  test("rejects invalid gender value with REQUIRED error code", () => {
    const result = $GenderInput.create("invalid-gender");
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("gender");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });
  
  test("getValue returns the gender value", () => {
    const result = $GenderInput.create(GenderEnum.MALE);
    
    if (result._tag === "success") {
      const genderInput = (result as Success<any>).value;
      expect($GenderInput.getValue(genderInput)).toBe(GenderEnum.MALE);
    }
  });
  
  test("getDisplayName returns the localized gender name for male", () => {
    const displayName = $GenderInput.getDisplayName(GenderEnum.MALE);
    expect(displayName).toBe("男性");
  });
  
  test("getDisplayName returns the localized gender name for female", () => {
    const displayName = $GenderInput.getDisplayName(GenderEnum.FEMALE);
    expect(displayName).toBe("女性");
  });
  
  test("getDisplayName returns 'unknown' for invalid gender", () => {
    // @ts-ignore: テスト用に無効な値を渡す
    const displayName = $GenderInput.getDisplayName("invalid-gender");
    expect(displayName).toBe("不明");
  });
});
