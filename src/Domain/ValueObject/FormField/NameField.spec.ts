import { describe, test, expect } from "vitest";
import { $NameField } from "./NameField.ts";
import { ErrorCodes } from "../../Error/ErrorCodes.ts";
import type { Success, Failure } from "../../Common/Result.ts";

describe("NameField", () => {
  test("creates a valid NameField with non-empty string", () => {
    const result = $NameField.create("山田太郎");
    expect(result._tag).toBe("success");

    if (result._tag === "success") {
      const nameInput = (result as Success<any>).value;
      expect($NameField.getValue(nameInput)).toBe("山田太郎");
    }
  });

  test("rejects empty string with REQUIRED error code", () => {
    const result = $NameField.create("");
    expect(result._tag).toBe("failure");

    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("name");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });

  test("getValue returns the name value", () => {
    const result = $NameField.create("山田太郎");

    if (result._tag === "success") {
      const nameInput = (result as Success<any>).value;
      expect($NameField.getValue(nameInput)).toBe("山田太郎");
    }
  });
});
