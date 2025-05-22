import { describe, test, expect } from "vitest";
import { $NameInput } from "./NameInput";
import { ErrorCodes } from "../../../Domain/Error/ErrorCodes";
import type { Success, Failure } from "../../../Domain/Common/Result";

describe("NameInput", () => {
  test("creates a valid NameInput with non-empty string", () => {
    const result = $NameInput.create("山田太郎");
    expect(result._tag).toBe("success");
    
    if (result._tag === "success") {
      const nameInput = (result as Success<any>).value;
      expect($NameInput.getValue(nameInput)).toBe("山田太郎");
    }
  });
  
  test("rejects empty string with REQUIRED error code", () => {
    const result = $NameInput.create("");
    expect(result._tag).toBe("failure");
    
    if (result._tag === "failure") {
      const errors = (result as Failure<any>).error;
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe("name");
      expect(errors[0].code).toBe(ErrorCodes.REQUIRED);
    }
  });
  
  test("getValue returns the name value", () => {
    const result = $NameInput.create("山田太郎");
    
    if (result._tag === "success") {
      const nameInput = (result as Success<any>).value;
      expect($NameInput.getValue(nameInput)).toBe("山田太郎");
    }
  });
});
