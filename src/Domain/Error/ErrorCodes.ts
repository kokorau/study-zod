/**
 * バリデーションエラーコードの定数
 */
export const ErrorCodes = {
  /** 必須項目が入力されていない */
  REQUIRED: 'required',
  /** 無効な形式 */
  INVALID_FORMAT: 'invalid_format',
  /** 文字数が少なすぎる */
  TOO_SHORT: 'too_short',
  /** 文字数が多すぎる */
  TOO_LONG: 'too_long',
  /** 値が小さすぎる */
  TOO_SMALL: 'too_small',
  /** 値が大きすぎる */
  TOO_LARGE: 'too_large',
  /** 無効な値 */
  INVALID: 'invalid',
} as const;

/**
 * エラーコードの型
 */
export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];
