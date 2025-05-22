import { z } from "zod";
import { ErrorCodes, type ErrorCode } from "../../Error/ErrorCodes";
import type { FormInput } from "./FormInput";
import {
  type FormInputUtil,
  type StringInput,
  type OptionalInput,
} from "./FormInputFactory";
import { success, failure } from "../../Common/Result";
import { createValidationError } from "../../Error/ValidationError";

export type BioInput = FormInput<string>;

export const $BioInput: FormInputUtil<BioInput, OptionalInput<StringInput>> = {
  schema: () => {
    return z.string().max(1000, {
      message: ErrorCodes.TOO_LONG,
    });
  },
  create: (value?: string) => {
    const normalizedValue = value || "";

    const result = $BioInput.schema().safeParse(normalizedValue);
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
  getValue: (input: BioInput): string => {
    return input.value;
  },
};
