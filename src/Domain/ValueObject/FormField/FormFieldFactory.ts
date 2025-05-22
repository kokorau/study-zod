import { z } from "zod";
import type { Result } from "../../Common/Result";
import { failure, success } from "../../Common/Result";
import type { ValidationError } from "../../Error/ValidationError";
import { createValidationError } from "../../Error/ValidationError";
import type { ErrorCode } from "../../Error/ErrorCodes";
import type { FormField } from "./FormField";
import type { InputType } from "../InputType/InputType.ts";

export interface FormFieldOperations<T, V = InputType> {
  schema: () => z.ZodType<T>;
  create: (value: V) => Result<FormField<T>, ValidationError[]>;
  getValue: (input: FormField<T>) => T;
}

type ExtractFieldParamType<T> =
  T extends FormFieldOperations<any, infer V> ? V : never;

export type ExtractFormDataType<T> = {
  [K in keyof T]: ExtractFieldParamType<T[K]>;
};

export const createFormFieldFactory = <T, V = T>(
  schemaFn: () => z.ZodType<T>,
  fieldName: string,
  parseValue?: (value: V) => unknown,
): FormFieldOperations<T, V> => ({
  schema: () => {
    return schemaFn();
  },
  /**
   * バリデーターによるチェックを行い、適合したら値を返す
   */
  create: (value: V): Result<FormField<T>, ValidationError[]> => {
    const parsedValue = parseValue ? parseValue(value) : value;

    const result = schemaFn().safeParse(parsedValue);

    if (!result.success) {
      return failure(
        result.error.errors.map((err) => {
          const code = err.message as ErrorCode;
          return createValidationError(fieldName, code);
        }),
      );
    }

    return success({ value: result.data });
  },
  getValue: (input: FormField<T>): T => {
    return input.value;
  },
});
