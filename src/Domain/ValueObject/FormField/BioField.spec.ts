import { describe, test, expect } from "vitest";
import { $BioField } from "./BioField.ts";
import { ErrorCodes } from "../Error/ErrorCodes.ts";
import type { Success, Failure } from "../Result/Result.ts";

describe("BioField", () => {
  test("creates a valid BioField with valid bio", () => {
    const result = $BioField.create("自己紹介文です。");
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const bioInput = (result as Success<any>).value;
      expect($BioField.getValue(bioInput)).toBe("自己紹介文です。");
    }
  });

  test("creates a valid BioField with empty string", () => {
    const result = $BioField.create("");
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const bioInput = (result as Success<any>).value;
      expect($BioField.getValue(bioInput)).toBe("");
    }
  });

  test("creates a valid BioField with undefined", () => {
    const result = $BioField.create(undefined);
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const bioInput = (result as Success<any>).value;
      expect($BioField.getValue(bioInput)).toBe("");
    }
  });

  test("rejects bio that is too long with TOO_LONG error code", () => {
    // 1001文字の文字列を作成
    const longBio = "a".repeat(1001);
    const result = $BioField.create(longBio);
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
    const result = $BioField.create(maxLengthBio);
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const bioInput = (result as Success<any>).value;
      expect($BioField.getValue(bioInput)).toBe(maxLengthBio);
    }
  });

  test("getValue returns the bio value", () => {
    const result = $BioField.create("自己紹介文です。");

    if (result._tag === "success") {
      const bioInput = (result as Success<any>).value;
      expect($BioField.getValue(bioInput)).toBe("自己紹介文です。");
    }
  });
});
