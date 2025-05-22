import { z } from "zod";
import { ErrorCodes, type ErrorCode } from "../../Error/ErrorCodes";
import type { FormField } from "./FormField";
import { type FormFieldUtil, type NumberField } from "./FormFieldFactory";
import { success, failure } from "../../Common/Result";
import { createValidationError } from "../../Error/ValidationError";

export type AgeField = FormField<number>;

export const $AgeField: FormFieldUtil<AgeField, NumberField> = {
  schema: () => {
    return z
      .number()
      .int({ message: ErrorCodes.INVALID_FORMAT })
      .min(0, { message: ErrorCodes.TOO_SMALL })
      .max(150, { message: ErrorCodes.TOO_LARGE });
  },
  create: (value: number | string) => {
    try {
      const numValue = typeof value === "string" ? parseInt(value, 10) : value;

      if (isNaN(numValue)) {
        throw new Error(ErrorCodes.INVALID_FORMAT);
      }

      const result = $AgeField.schema().safeParse(numValue);
      if (!result.success) {
        return failure(
          result.error.errors.map((err: z.ZodIssue) => {
            const code = err.message as ErrorCode;
            return createValidationError("age", code);
          }),
        );
      }
      return success({ value: result.data });
    } catch (error) {
      return failure([createValidationError("age", ErrorCodes.INVALID_FORMAT)]);
    }
  },
  getValue: (input: AgeField): number => {
    return input.value;
  },
};
