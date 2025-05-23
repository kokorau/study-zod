import { describe, test, expect } from "vitest";
import { $TermsAgreementField } from "./TermsAgreementField.ts";
import { ErrorCodes } from "../Error/ErrorCodes.ts";
import type { Success, Failure } from "../Result/Result.ts";

describe("TermsAgreementField", () => {
  test("creates a valid TermsAgreementField with true value", () => {
    const result = $TermsAgreementField.create(true);
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const termsInput = (result as Success<any>).value;
      expect($TermsAgreementField.getValue(termsInput)).toBe(true);
    }
  });

  test("creates a valid TermsAgreementField with 'true' string value", () => {
    const result = $TermsAgreementField.create("true");
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const termsInput = (result as Success<any>).value;
      expect($TermsAgreementField.getValue(termsInput)).toBe(true);
    }
  });

  test("creates a valid TermsAgreementField with 'on' string value", () => {
    const result = $TermsAgreementField.create("on");
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const termsInput = (result as Success<any>).value;
      expect($TermsAgreementField.getValue(termsInput)).toBe(true);
    }
  });

  test("creates a valid TermsAgreementField with '1' string value", () => {
    const result = $TermsAgreementField.create("1");
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const termsInput = (result as Success<any>).value;
      expect($TermsAgreementField.getValue(termsInput)).toBe(true);
    }
  });

  test("rejects false value with REQUIRED error code", () => {
    const result = $TermsAgreementField.create(false);
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("agreeTerms");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });

  test("rejects 'false' string value with REQUIRED error code", () => {
    const result = $TermsAgreementField.create("false");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("agreeTerms");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });

  test("rejects empty string with REQUIRED error code", () => {
    const result = $TermsAgreementField.create("");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("agreeTerms");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });

  test("getValue returns the terms agreement value", () => {
    const result = $TermsAgreementField.create(true);

    if (result._tag === "success") {
      const termsInput = (result as Success<any>).value;
      expect($TermsAgreementField.getValue(termsInput)).toBe(true);
    }
  });
});
