import { z } from "zod";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormField } from "./FormField";
import { createFormFieldFactory, type FormFieldOperations } from "./FormFieldFactory";
import type { OptionalInput, StringInput } from "../InputType/InputType.ts";

export type BioField = FormField<string>;

export const $BioField: FormFieldOperations<string, OptionalInput<StringInput>> = 
  createFormFieldFactory<string, OptionalInput<StringInput>>(
    () => {
      return z.string().max(1000, {
        message: ErrorCodes.TOO_LONG,
      });
    },
    "bio",
    (value?: string) => value || ""
  );
