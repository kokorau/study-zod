import { describe, test, expect } from "vitest";
import { $TermsAgreementInput } from "./TermsAgreementInput";
import { ErrorCodes } from "../../../Domain/Error/ErrorCodes";
import type { Success, Failure } from "../../../Domain/Common/Result";

describe("TermsAgreementInput", () => {
  test("creates a valid TermsAgreementInput with true value", () => {
    const result = $TermsAgreementInput.create(true);
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const termsInput = (result as Success<any>).value;
      expect($TermsAgreementInput.getValue(termsInput)).toBe(true);
    }
  });
  
  test("creates a valid TermsAgreementInput with 'true' string value", () => {
    const result = $TermsAgreementInput.create("true");
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const termsInput = (result as Success<any>).value;
      expect($TermsAgreementInput.getValue(termsInput)).toBe(true);
    }
  });
  
  test("creates a valid TermsAgreementInput with 'on' string value", () => {
    const result = $TermsAgreementInput.create("on");
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const termsInput = (result as Success<any>).value;
      expect($TermsAgreementInput.getValue(termsInput)).toBe(true);
    }
  });
  
  test("creates a valid TermsAgreementInput with '1' string value", () => {
    const result = $TermsAgreementInput.create("1");
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const termsInput = (result as Success<any>).value;
      expect($TermsAgreementInput.getValue(termsInput)).toBe(true);
    }
  });
  
  test("rejects false value with REQUIRED error code", () => {
    const result = $TermsAgreementInput.create(false);
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("agreeTerms");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });
  
  test("rejects 'false' string value with REQUIRED error code", () => {
    const result = $TermsAgreementInput.create("false");
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("agreeTerms");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });
  
  test("rejects empty string with REQUIRED error code", () => {
    const result = $TermsAgreementInput.create("");
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("agreeTerms");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });
  
  test("getValue returns the terms agreement value", () => {
    const result = $TermsAgreementInput.create(true);
    
    if (result._tag === "success") {
      const termsInput = (result as Success<any>).value;
      expect($TermsAgreementInput.getValue(termsInput)).toBe(true);
    }
  });
});
