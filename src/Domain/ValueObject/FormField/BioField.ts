import { z } from "zod";
import { ErrorCodes, type ErrorCode } from "../../Error/ErrorCodes";
import type { FormField } from "./FormField";
import {
  type FormFieldUtil,
  type StringField,
  type OptionalField,
} from "./FormFieldFactory";
import { success, failure } from "../../Common/Result";
import { createValidationError } from "../../Error/ValidationError";

export type BioField = FormField<string>;

export const $BioField: FormFieldUtil<BioField, OptionalField<StringField>> = {
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
