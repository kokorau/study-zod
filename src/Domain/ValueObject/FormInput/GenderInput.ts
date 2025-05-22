import { z } from "zod";
import type { Result } from "../../Common/Result";
import { success, failure } from "../../Common/Result";
import type { ValidationError } from "../../Error/ValidationError";
import { createValidationError } from "../../Error/ValidationError";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormInput } from "./FormInput";
import type { FormInputUtil, EnumInput } from "./FormInputFactory";

export const GenderEnum = {
  MALE: "male",
  FEMALE: "female",
} as const;

export type Gender = "male" | "female";

export type GenderInput = FormInput<Gender>;

export const $GenderInput: FormInputUtil<GenderInput, EnumInput<Gender>> = {
  schema: () => {
    return z.enum([GenderEnum.MALE, GenderEnum.FEMALE], {
      errorMap: () => ({ message: ErrorCodes.REQUIRED }),
    });
  },
  create: (value: string): Result<GenderInput, ValidationError[]> => {
    const result = $GenderInput.schema().safeParse(value);
    if (!result.success) {
      return failure([createValidationError("gender", ErrorCodes.REQUIRED)]);
    }
    return success({ value: result.data });
  },
  getValue: (input: GenderInput): Gender => {
    return input.value;
  },
  getDisplayName: (gender: Gender): string => {
    switch (gender) {
      case GenderEnum.MALE:
        return "男性";
      case GenderEnum.FEMALE:
        return "女性";
      default:
        return "不明";
    }
  },
};
