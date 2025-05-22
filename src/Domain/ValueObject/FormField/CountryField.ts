import { z } from "zod";
import type { Result } from "../../Common/Result";
import { success, failure } from "../../Common/Result";
import type { ValidationError } from "../../Error/ValidationError";
import { createValidationError } from "../../Error/ValidationError";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormField } from "./FormField";
import type { FormFieldUtil, EnumField } from "./FormFieldFactory";

export const CountryEnum = {
  JAPAN: "jp",
  USA: "us",
  UK: "uk",
} as const;

export type Country = "jp" | "us" | "uk";

export type CountryField = FormField<Country>;

export const $CountryField: FormFieldUtil<CountryField, EnumField<Country>> = {
  schema: () =>
    z.enum([CountryEnum.JAPAN, CountryEnum.USA, CountryEnum.UK], {
      errorMap: () => ({ message: ErrorCodes.REQUIRED }),
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
