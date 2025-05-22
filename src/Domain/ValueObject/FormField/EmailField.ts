import { z } from "zod";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormField } from "./FormField";
import {
  createFormFieldFactory,
  type FormFieldUtil,
  type StringField,
} from "./FormFieldFactory";

export type EmailField = FormField<string>;

export const $EmailField: FormFieldUtil<EmailField, StringField> =
  createFormFieldFactory<string, string>(() => {
    return z
      .string()
      .min(1, { message: ErrorCodes.REQUIRED })
      .email({ message: ErrorCodes.INVALID_FORMAT });
  }, "email");
