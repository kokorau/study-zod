import { z } from "zod";
import type { Result } from "../../Common/Result";
import { success, failure } from "../../Common/Result";
import type { ValidationError } from "../../Error/ValidationError";
import { createValidationError } from "../../Error/ValidationError";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormField } from "./FormField";
import type { FormFieldUtil, EnumField } from "./FormFieldFactory";

export const GenderEnum = {
  MALE: "male",
  FEMALE: "female",
} as const;

export type Gender = "male" | "female";

export type GenderField = FormField<Gender>;

export const $GenderField: FormFieldUtil<GenderField, EnumField<Gender>> = {
  schema: () => {
    return z.enum([GenderEnum.MALE, GenderEnum.FEMALE], {
      errorMap: () => ({ message: ErrorCodes.REQUIRED }),
    });
  },
  create: (value: string): Result<GenderField, ValidationError[]> => {
    const result = $GenderField.schema().safeParse(value);
    if (!result.success) {
      return failure([createValidationError("gender", ErrorCodes.REQUIRED)]);
    }
    return success({ value: result.data });
  },
  getValue: (input: GenderField): Gender => {
    return input.value;
  },
};
