import { describe, test, expect } from "vitest";
import { $CountryField, CountryEnum } from "./CountryField.ts";
import { ErrorCodes } from "../Error/ErrorCodes.ts";
import type { Success, Failure } from "../Result/Result.ts";

describe("CountryField", () => {
  test("creates a valid CountryField with Japan value", () => {
    const result = $CountryField.create(CountryEnum.JAPAN);
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const countryInput = (result as Success<any>).value;
      expect($CountryField.getValue(countryInput)).toBe(CountryEnum.JAPAN);
    }
  });

  test("creates a valid CountryField with USA value", () => {
    const result = $CountryField.create(CountryEnum.USA);
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const countryInput = (result as Success<any>).value;
      expect($CountryField.getValue(countryInput)).toBe(CountryEnum.USA);
    }
  });

  test("creates a valid CountryField with UK value", () => {
    const result = $CountryField.create(CountryEnum.UK);
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const countryInput = (result as Success<any>).value;
      expect($CountryField.getValue(countryInput)).toBe(CountryEnum.UK);
    }
  });

  test("rejects empty string with REQUIRED error code", () => {
    const result = $CountryField.create("");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("country");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });

  test("rejects invalid country value with INVALID error code", () => {
    const result = $CountryField.create("invalid-country");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("country");
      expect(errors[0].code).toBe(ErrorCodes.INVALID);
    }
  });

  test("getValue returns the country value", () => {
    const result = $CountryField.create(CountryEnum.JAPAN);

    if (result._tag === "success") {
      const countryInput = (result as Success<any>).value;
      expect($CountryField.getValue(countryInput)).toBe(CountryEnum.JAPAN);
    }
  });
});
