export type StringInput = string;
export type NumberInput = number | string;
export type BooleanInput = boolean | string;
export type EnumInput<T extends string> = T | string;
export type OptionalInput<T> = T | undefined;

export type InputType =
  | StringInput
  | NumberInput
  | BooleanInput
  | EnumInput<string>
  | OptionalInput<string>;
