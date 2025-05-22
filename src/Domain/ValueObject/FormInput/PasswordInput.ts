import { z } from "zod";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormInput } from "./FormInput";
import {
  createFormInputFactory,
  type FormInputUtil,
  type StringInput,
} from "./FormInputFactory";

export type PasswordInput = FormInput<string>;

export const $PasswordInput: FormInputUtil<PasswordInput, StringInput> =
  createFormInputFactory<string, string>(() => {
    return z
      .string()
      .min(1, { message: ErrorCodes.REQUIRED })
      .min(8, { message: ErrorCodes.TOO_SHORT })
      .regex(/[A-Z]/, { message: ErrorCodes.INVALID_FORMAT })
      .regex(/[a-z]/, { message: ErrorCodes.INVALID_FORMAT })
      .regex(/[0-9]/, { message: ErrorCodes.INVALID_FORMAT });
  }, "password");
