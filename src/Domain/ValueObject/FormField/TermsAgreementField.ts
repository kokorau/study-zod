import { z } from "zod";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormField } from "./FormField";
import { type FormFieldOperations } from "./FormFieldFactory";
import { success, failure } from "../../Common/Result";
import { createValidationError } from "../../Error/ValidationError";
import type { BooleanInput } from "../InputType/InputType.ts";

export type TermsAgreementField = FormField<boolean>;

export const $TermsAgreementField: FormFieldOperations<
  boolean,
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

    const result = $TermsAgreementField.schema().safeParse(boolValue);
    if (!result.success) {
      return failure([
        createValidationError("agreeTerms", ErrorCodes.REQUIRED),
      ]);
    }
    return success({ value: result.data });
  },
  getValue: (input: TermsAgreementField): boolean => {
    return input.value;
  },
};
