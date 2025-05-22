import { z } from "zod";
import { ErrorCodes, type ErrorCode } from "../../Error/ErrorCodes";
import type { FormField } from "./FormField";
import { type FormFieldOperations } from "./FormFieldFactory";
import { success, failure } from "../../Common/Result";
import { createValidationError } from "../../Error/ValidationError";
import type { OptionalInput, StringInput } from "../InputType/InputType.ts";

export type BioField = FormField<string>;

export const $BioField: FormFieldOperations<string, OptionalInput<StringInput>> = {
  schema: () => {
    return z.string().max(1000, {
      message: ErrorCodes.TOO_LONG,
    });
  },
  create: (value?: string) => {
    const normalizedValue = value || "";

    const result = $BioField.schema().safeParse(normalizedValue);
    if (!result.success) {
      return failure(
        result.error.errors.map((err: z.ZodIssue) => {
          const code = err.message as ErrorCode;
          return createValidationError("bio", code);
        }),
      );
    }
    return success({ value: result.data });
  },
  getValue: (input: BioField): string => {
    return input.value;
  },
};
