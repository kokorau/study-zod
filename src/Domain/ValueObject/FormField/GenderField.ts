import { z } from "zod";
import type { Result } from "../Result/Result";
import { success, failure } from "../Result/Result";
import type { ValidationError } from "../Error/ValidationError";
import { createValidationError } from "../Error/ValidationError";
import { ErrorCodes } from "../Error/ErrorCodes";
import type { FormField } from "./FormField";
import type { FormFieldOperations } from "./FormFieldFactory";
import type { EnumInput } from "../InputType/InputType.ts";

export const GenderEnum = {
  MALE: "male",
  FEMALE: "female",
} as const;

export type Gender = "male" | "female";

export type GenderField = FormField<Gender>;

export const $GenderField: FormFieldOperations<Gender, EnumInput<Gender>> = {
  schema: () => {
    return z.enum([GenderEnum.MALE, GenderEnum.FEMALE], {
      errorMap: () => ({ message: ErrorCodes.REQUIRED }),
    });
  },
  create: (value: string): Result<GenderField, ValidationError[]> => {
    // 空文字列の場合は特別なエラーを返す
    if (!value) {
      return failure([createValidationError("gender", ErrorCodes.REQUIRED)]);
    }

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
