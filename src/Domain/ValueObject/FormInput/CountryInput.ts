import { z } from "zod";
import type { Result } from "../../Common/Result";
import { success, failure } from "../../Common/Result";
import type { ValidationError } from "../../Error/ValidationError";
import { createValidationError } from "../../Error/ValidationError";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormInput } from "./FormInput";
import type { FormInputUtil, EnumInput } from "./FormInputFactory";

export const CountryEnum = {
  JAPAN: "jp",
  USA: "us",
  UK: "uk",
} as const;

export type Country = "jp" | "us" | "uk";

export type CountryInput = FormInput<Country>;

export const $CountryInput: FormInputUtil<CountryInput, EnumInput<Country>> = {
  schema: () =>
    z.enum([CountryEnum.JAPAN, CountryEnum.USA, CountryEnum.UK], {
      errorMap: () => ({ message: ErrorCodes.REQUIRED }),
    }),
  create: (value: string): Result<CountryInput, ValidationError[]> => {
    if (!value) {
      return failure([createValidationError("country", ErrorCodes.REQUIRED)]);
    }

    const result = $CountryInput.schema().safeParse(value);
    if (!result.success) {
      return failure([createValidationError("country", ErrorCodes.INVALID)]);
    }
    return success({ value: result.data });
  },
  getValue: (input: CountryInput): Country => input.value,
};
