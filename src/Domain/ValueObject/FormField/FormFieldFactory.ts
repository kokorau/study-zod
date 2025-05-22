import { z } from 'zod';
import type { Result } from '../../Common/Result';
import { success, failure } from '../../Common/Result';
import type { ValidationError } from '../../Error/ValidationError';
import { createValidationError } from '../../Error/ValidationError';
import type { ErrorCode } from '../../Error/ErrorCodes';
import type { FormField } from './FormField';

/**
 * 基本的な入力値の型定義
 */
export type StringField = string;
export type NumberField = number | string;  // 数値または文字列（変換可能）
export type BooleanField = boolean | string;  // 真偽値または文字列（変換可能）
export type EnumField<T extends string> = T | string;  // 列挙型または文字列
export type OptionalField<T> = T | undefined;  // オプショナル入力

/**
 * 入力値の型をまとめたユニオン型
 */
export type FormFieldValueType = 
  | StringField
  | NumberField
  | BooleanField
  | EnumField<string>
  | OptionalField<string>;

/**
 * フォームフィールド操作を提供する共通インターフェース
 * @template T 入力値の型
 * @template V 検証前の入力値の型（オプション）
 */
export interface FormFieldOperations<T, V = FormFieldValueType> {
  /** バリデーションスキーマを取得する */
  schema: () => z.ZodType<T>;
  
  /** フォームフィールドを作成する */
  create: (value: V) => Result<FormField<T>, ValidationError[]>;
  
  /** フォームフィールドの値を取得する */
  getValue: (input: FormField<T>) => T;
}

/**
 * フォームフィールドユーティリティの型
 * @template I フォームフィールドの型
 * @template V 検証前の入力値の型（オプション）
 */
export type FormFieldUtil<I extends FormField<any>, V = FormFieldValueType> = {
  /** バリデーションスキーマを取得する */
  schema: () => z.ZodType<I['value']>;
  
  /** フォームフィールドを作成する */
  create: (value: V) => Result<I, ValidationError[]>;
  
  /** フォームフィールドの値を取得する */
  getValue: (input: I) => I['value'];
  
  /** その他のメソッド（オプション） */
  [key: string]: any;
};

/**
 * フォームフィールド操作から入力値の型を抽出するユーティリティ型
 */
export type ExtractFieldValueType<T> = 
  T extends FormFieldOperations<infer U, any> ? U : never;

/**
 * フォームフィールド操作から検証前の入力値の型を抽出するユーティリティ型
 */
export type ExtractFieldParamType<T> = 
  T extends FormFieldOperations<any, infer V> ? V : never;

/**
 * フォームオブジェクトから入力データ型を導出するユーティリティ型
 * 検証前の入力値の型を使用して、テストとの互換性を保つ
 */
export type ExtractFormDataType<T> = {
  [K in keyof T]: ExtractFieldParamType<T[K]>;
};

/**
 * フォームフィールドの操作オブジェクトを作成するファクトリー関数
 * @template T 入力値の型
 * @template V 検証前の入力値の型
 * @param schemaFn Zodスキーマを取得する関数
 * @param fieldName フィールド名
 * @param parseValue 入力値を変換する関数（オプション）
 * @returns フォームフィールドの操作オブジェクト
 */
export const createFormFieldFactory = <T, V = T>(
  schemaFn: () => z.ZodType<T>,
  fieldName: string,
  parseValue?: (value: V) => unknown
): FormFieldOperations<T, V> => ({
  /**
   * バリデーションスキーマを取得する
   * @returns Zodスキーマ
   */
  schema: () => schemaFn(),
  
  /**
   * フォームフィールドを作成する
   * @param value 入力値
   * @returns 成功した場合はフォームフィールドオブジェクト、失敗した場合はバリデーションエラーの配列
   */
  create: (value: V): Result<FormField<T>, ValidationError[]> => {
    // 入力値を変換する関数が指定されている場合は変換
    const parsedValue = parseValue ? parseValue(value) : value;
    
    const result = schemaFn().safeParse(parsedValue);
    if (!result.success) {
      return failure(
        result.error.errors.map(err => {
          const code = err.message as ErrorCode;
          return createValidationError(fieldName, code);
        })
      );
    }
    return success({ value: result.data });
  },
  
  /**
   * フォームフィールドの値を取得する
   * @param input フォームフィールドオブジェクト
   * @returns 入力値
   */
  getValue: (input: FormField<T>): T => input.value
});
