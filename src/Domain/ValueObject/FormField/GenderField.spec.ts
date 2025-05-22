import { describe, test, expect } from "vitest";
import { $GenderField, GenderEnum } from "./GenderField.ts";
import { ErrorCodes } from "../../Error/ErrorCodes.ts";
import type { Success, Failure } from "../../Common/Result.ts";

describe("GenderField", () => {
  test("creates a valid GenderField with male value", () => {
    const result = $GenderField.create(GenderEnum.MALE);
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const genderInput = (result as Success<any>).value;
      expect($GenderField.getValue(genderInput)).toBe(GenderEnum.MALE);
    }
  });

  test("creates a valid GenderField with female value", () => {
    const result = $GenderField.create(GenderEnum.FEMALE);
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const genderInput = (result as Success<any>).value;
      expect($GenderField.getValue(genderInput)).toBe(GenderEnum.FEMALE);
    }
  });

  test("rejects empty string with REQUIRED error code", () => {
    const result = $GenderField.create("");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("gender");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });

  test("rejects invalid gender value with REQUIRED error code", () => {
    const result = $GenderField.create("invalid-gender");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("gender");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });

  test("getValue returns the gender value", () => {
    const result = $GenderField.create(GenderEnum.MALE);

    if (result._tag === "success") {
      const genderInput = (result as Success<any>).value;
      expect($GenderField.getValue(genderInput)).toBe(GenderEnum.MALE);
    }
  });
});
