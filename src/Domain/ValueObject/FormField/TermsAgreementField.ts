import { z } from "zod";
import { ErrorCodes } from "../Error/ErrorCodes";
import type { FormField } from "./FormField";
import {
  createFormFieldFactory,
  type FormFieldOperations,
} from "./FormFieldFactory";
import type { BooleanInput } from "../InputType/InputType.ts";

export type TermsAgreementField = FormField<boolean>;

export const $TermsAgreementField: FormFieldOperations<boolean, BooleanInput> =
  createFormFieldFactory<boolean, BooleanInput>(
    () => {
      return z.boolean().refine((val) => val === true, {
        message: ErrorCodes.REQUIRED,
      });
    },
    "agreeTerms",
    (value: boolean | string) => {
      return typeof value === "string"
        ? value === "true" || value === "on" || value === "1"
        : !!value;
    },
  );
