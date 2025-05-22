import { z } from "zod";
import { ErrorCodes, type ErrorCode } from "../../Error/ErrorCodes";
import type { FormInput } from "./FormInput";
import { type FormInputUtil, type NumberInput } from "./FormInputFactory";
import { success, failure } from "../../Common/Result";
import { createValidationError } from "../../Error/ValidationError";

export type AgeInput = FormInput<number>;

export const $AgeInput: FormInputUtil<AgeInput, NumberInput> = {
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

      const result = $AgeInput.schema().safeParse(numValue);
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
  getValue: (input: AgeInput): number => {
    return input.value;
  },
};
