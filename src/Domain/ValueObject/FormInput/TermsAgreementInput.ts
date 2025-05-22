import { z } from "zod";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormInput } from "./FormInput";
import { type FormInputUtil, type BooleanInput } from "./FormInputFactory";
import { success, failure } from "../../Common/Result";
import { createValidationError } from "../../Error/ValidationError";

export type TermsAgreementInput = FormInput<boolean>;

export const $TermsAgreementInput: FormInputUtil<
  TermsAgreementInput,
  BooleanInput
> = {
  schema: () => {
    return z.boolean().refine((val) => val === true, {
      message: ErrorCodes.REQUIRED,
    });
  },
  create: (value: boolean | string) => {
    const boolValue =
      typeof value === "string"
        ? value === "true" || value === "on" || value === "1"
        : !!value;

    const result = $TermsAgreementInput.schema().safeParse(boolValue);
    if (!result.success) {
      return failure([
        createValidationError("agreeTerms", ErrorCodes.REQUIRED),
      ]);
    }
    return success({ value: result.data });
  },
  getValue: (input: TermsAgreementInput): boolean => {
    return input.value;
  },
};
