import { z } from "zod";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormInput } from "./FormInput";
import {
  createFormInputFactory,
  type FormInputUtil,
  type StringInput,
} from "./FormInputFactory";

export type NameInput = FormInput<string>;

export const $NameInput: FormInputUtil<NameInput, StringInput> =
  createFormInputFactory<string, string>(() => {
    return z.string().min(1, {
      message: ErrorCodes.REQUIRED,
    });
  }, "name");
