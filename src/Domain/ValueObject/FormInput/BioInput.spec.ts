import { describe, test, expect } from "vitest";
import { $BioInput } from "./BioInput";
import { ErrorCodes } from "../../../Domain/Error/ErrorCodes";
import type { Success, Failure } from "../../../Domain/Common/Result";

describe("BioInput", () => {
  test("creates a valid BioInput with valid bio", () => {
    const result = $BioInput.create("自己紹介文です。");
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const bioInput = (result as Success<any>).value;
      expect($BioInput.getValue(bioInput)).toBe("自己紹介文です。");
    }
  });
  
  test("creates a valid BioInput with empty string", () => {
    const result = $BioInput.create("");
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const bioInput = (result as Success<any>).value;
      expect($BioInput.getValue(bioInput)).toBe("");
    }
  });
  
  test("creates a valid BioInput with undefined", () => {
    const result = $BioInput.create(undefined);
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const bioInput = (result as Success<any>).value;
      expect($BioInput.getValue(bioInput)).toBe("");
    }
  });
  
  test("rejects bio that is too long with TOO_LONG error code", () => {
    // 1001文字の文字列を作成
    const longBio = "a".repeat(1001);
    const result = $BioInput.create(longBio);
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("bio");
      expect(errors[0].code).toBe(ErrorCodes.TOO_LONG);
    }
  });
  
  test("accepts bio that is exactly at the maximum length", () => {
    // 1000文字の文字列を作成
    const maxLengthBio = "a".repeat(1000);
    const result = $BioInput.create(maxLengthBio);
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const bioInput = (result as Success<any>).value;
      expect($BioInput.getValue(bioInput)).toBe(maxLengthBio);
    }
  });
  
  test("getValue returns the bio value", () => {
    const result = $BioInput.create("自己紹介文です。");
    
    if (result._tag === "success") {
      const bioInput = (result as Success<any>).value;
      expect($BioInput.getValue(bioInput)).toBe("自己紹介文です。");
    }
  });
});
