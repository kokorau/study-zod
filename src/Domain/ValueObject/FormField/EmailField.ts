import { z } from "zod";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormField } from "./FormField";
import { createFormFieldFactory, type FormFieldOperations } from "./FormFieldFactory";
import type { StringInput } from "../InputType/InputType.ts";

export type EmailField = FormField<string>;

export const $EmailField: FormFieldOperations<string, StringInput> =
  createFormFieldFactory<string, string>(() => {
    return z
      .string()
      .min(1, { message: ErrorCodes.REQUIRED })
      .email({ message: ErrorCodes.INVALID_FORMAT });
  }, "email");
