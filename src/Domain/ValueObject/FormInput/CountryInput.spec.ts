import { describe, test, expect } from "vitest";
import { $CountryInput, CountryEnum } from "./CountryInput";
import { ErrorCodes } from "../../../Domain/Error/ErrorCodes";
import type { Success, Failure } from "../../../Domain/Common/Result";

describe("CountryInput", () => {
  test("creates a valid CountryInput with Japan value", () => {
    const result = $CountryInput.create(CountryEnum.JAPAN);
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const countryInput = (result as Success<any>).value;
      expect($CountryInput.getValue(countryInput)).toBe(CountryEnum.JAPAN);
    }
  });

  test("creates a valid CountryInput with USA value", () => {
    const result = $CountryInput.create(CountryEnum.USA);
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const countryInput = (result as Success<any>).value;
      expect($CountryInput.getValue(countryInput)).toBe(CountryEnum.USA);
    }
  });

  test("creates a valid CountryInput with UK value", () => {
    const result = $CountryInput.create(CountryEnum.UK);
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const countryInput = (result as Success<any>).value;
      expect($CountryInput.getValue(countryInput)).toBe(CountryEnum.UK);
    }
  });

  test("rejects empty string with REQUIRED error code", () => {
    const result = $CountryInput.create("");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("country");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });

  test("rejects invalid country value with INVALID error code", () => {
    const result = $CountryInput.create("invalid-country");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("country");
      expect(errors[0].code).toBe(ErrorCodes.INVALID);
    }
  });

  test("getValue returns the country value", () => {
    const result = $CountryInput.create(CountryEnum.JAPAN);

    if (result._tag === "success") {
      const countryInput = (result as Success<any>).value;
      expect($CountryInput.getValue(countryInput)).toBe(CountryEnum.JAPAN);
    }
  });
});
