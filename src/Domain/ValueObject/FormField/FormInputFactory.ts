import { z } from "zod";
import type { Result } from "../../Common/Result.ts";
import { success, failure } from "../../Common/Result.ts";
import type { ValidationError } from "../../Error/ValidationError.ts";
import { createValidationError } from "../../Error/ValidationError.ts";
import type { ErrorCode } from "../../Error/ErrorCodes.ts";
import type { FormInput } from "./FormInput.ts";

/**
 * 基本的な入力値の型定義
 */
export type StringInput = string;
export type NumberInput = number | string; // 数値または文字列（変換可能）
export type BooleanInput = boolean | string; // 真偽値または文字列（変換可能）
export type EnumInput<T extends string> = T | string; // 列挙型または文字列
export type OptionalInput<T> = T | undefined; // オプショナル入力

/**
 * 入力値の型をまとめたユニオン型
 */
export type FormInputValueType =
  | StringInput
  | NumberInput
  | BooleanInput
  | EnumInput<string>
  | OptionalInput<string>;

/**
 * フォーム入力操作を提供する共通インターフェース
 * @template T 入力値の型
 * @template V 検証前の入力値の型（オプション）
 */
export interface FormInputOperations<T, V = FormInputValueType> {
  /** バリデーションスキーマを取得する */
  schema: () => z.ZodType<T>;

  /** フォーム入力を作成する */
  create: (value: V) => Result<FormInput<T>, ValidationError[]>;

  /** フォーム入力の値を取得する */
  getValue: (input: FormInput<T>) => T;
}

/**
 * フォーム入力ユーティリティの型
 * @template I フォーム入力の型
 * @template V 検証前の入力値の型（オプション）
 */
export type FormInputUtil<I extends FormInput<any>, V = FormInputValueType> = {
  /** バリデーションスキーマを取得する */
  schema: () => z.ZodType<I["value"]>;

  /** フォーム入力を作成する */
  create: (value: V) => Result<I, ValidationError[]>;

  /** フォーム入力の値を取得する */
  getValue: (input: I) => I["value"];

  /** その他のメソッド（オプション） */
  [key: string]: any;
};

/**
 * フォーム入力操作から入力値の型を抽出するユーティリティ型
 */
export type ExtractInputValueType<T> =
  T extends FormInputOperations<infer U, any> ? U : never;

/**
 * フォーム入力操作から検証前の入力値の型を抽出するユーティリティ型
 */
export type ExtractInputParamType<T> =
  T extends FormInputOperations<any, infer V> ? V : never;

/**
 * フォームオブジェクトから入力データ型を導出するユーティリティ型
 * 検証前の入力値の型を使用して、テストとの互換性を保つ
 */
export type ExtractFormDataType<T> = {
  [K in keyof T]: ExtractInputParamType<T[K]>;
};

/**
 * フォーム入力の操作オブジェクトを作成するファクトリー関数
 * @template T 入力値の型
 * @template V 検証前の入力値の型
 * @param schemaFn Zodスキーマを取得する関数
 * @param fieldName フィールド名
 * @param parseValue 入力値を変換する関数（オプション）
 * @returns フォーム入力の操作オブジェクト
 */
export const createFormInputFactory = <T, V = T>(
  schemaFn: () => z.ZodType<T>,
  fieldName: string,
  parseValue?: (value: V) => unknown,
): FormInputOperations<T, V> => ({
  /**
   * バリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => schemaFn(),

  /**
   * フォーム入力を作成する
   * @param value 入力値
   * @returns 成功した場合はフォーム入力オブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value: V): Result<FormInput<T>, ValidationError[]> => {
    // 入力値を変換する関数が指定されている場合は変換
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

  /**
   * フォーム入力の値を取得する
   * @param input フォーム入力オブジェクト
   * @returns 入力値
   */
  getValue: (input: FormInput<T>): T => input.value,
});
