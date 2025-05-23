import { z } from "zod";
import type { Result } from "../Result/Result";
import { success, failure } from "../Result/Result";
import type { ValidationError } from "../Error/ValidationError";
import { createValidationError } from "../Error/ValidationError";
import { ErrorCodes } from "../Error/ErrorCodes";
import type { FormField } from "./FormField";
import type { FormFieldOperations } from "./FormFieldFactory";
import type { EnumInput } from "../InputType/InputType.ts";

export const CountryEnum = {
  JAPAN: "jp",
  USA: "us",
  UK: "uk",
} as const;

export type Country = "jp" | "us" | "uk";

export type CountryField = FormField<Country>;

export const $CountryField: FormFieldOperations<Country, EnumInput<Country>> = {
  schema: () =>
    z.enum([CountryEnum.JAPAN, CountryEnum.USA, CountryEnum.UK], {
      errorMap: () => ({ message: ErrorCodes.INVALID }),
    }),
  create: (value: string): Result<CountryField, ValidationError[]> => {
    if (!value) {
      return failure([createValidationError("country", ErrorCodes.REQUIRED)]);
    }

    const result = $CountryField.schema().safeParse(value);
    if (!result.success) {
      return failure([createValidationError("country", ErrorCodes.INVALID)]);
    }
    return success({ value: result.data });
  },
  getValue: (input: CountryField): Country => input.value,
};
