import { z } from "zod";
import { ErrorCodes } from "../../Error/ErrorCodes";
import type { FormField } from "./FormField";
import { createFormFieldFactory, type FormFieldOperations } from "./FormFieldFactory";
import type { NumberInput } from "../InputType/InputType.ts";

export type AgeField = FormField<number>;

export const $AgeField: FormFieldOperations<number, NumberInput> = 
  createFormFieldFactory<number, NumberInput>(
    () => {
      return z.coerce.number({
        errorMap: (issue, ctx) => {
          // 型変換エラーの場合（NaNになる場合）
          if (issue.code === 'invalid_type' && issue.received === 'nan') {
            return { message: ErrorCodes.INVALID_FORMAT };
          }
          // その他のエラーはデフォルト処理
          return { message: ctx.defaultError };
        }
      })
        .int({ message: ErrorCodes.INVALID_FORMAT })
        .min(0, { message: ErrorCodes.TOO_SMALL })
        .max(150, { message: ErrorCodes.TOO_LARGE });
    },
    "age"
  );
