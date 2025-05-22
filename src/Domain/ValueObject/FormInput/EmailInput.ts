import { z } from "zod";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormInput } from "./FormInput";
import {
  createFormInputFactory,
  type FormInputUtil,
  type StringInput,
} from "./FormInputFactory";

export type EmailInput = FormInput<string>;

export const $EmailInput: FormInputUtil<EmailInput, StringInput> =
  createFormInputFactory<string, string>(() => {
    return z
      .string()
      .min(1, { message: ErrorCodes.REQUIRED })
      .email({ message: ErrorCodes.INVALID_FORMAT });
  }, "email");
