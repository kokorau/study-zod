import { z } from "zod";
import { ErrorCodes } from "../Error/ErrorCodes";
import type { FormField } from "./FormField";
import { createFormFieldFactory, type FormFieldOperations } from "./FormFieldFactory";
import type { StringInput } from "../InputType/InputType.ts";

export type PasswordField = FormField<string>;

export const $PasswordField: FormFieldOperations<string, StringInput> =
  createFormFieldFactory<string, string>(() => {
    return z
      .string()
      .min(1, { message: ErrorCodes.REQUIRED })
      .min(8, { message: ErrorCodes.TOO_SHORT })
      .regex(/[A-Z]/, { message: ErrorCodes.INVALID_FORMAT })
      .regex(/[a-z]/, { message: ErrorCodes.INVALID_FORMAT })
      .regex(/[0-9]/, { message: ErrorCodes.INVALID_FORMAT });
  }, "password");
