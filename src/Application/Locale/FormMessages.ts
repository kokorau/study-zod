import { ErrorCodes } from '../../Domain/ValueObject/Error/ErrorCodes';

/**
 * フォームのエラーメッセージをローカライズするための定数
 * @returns 日本語と英語のメッセージを含むオブジェクト
 */
export const getLocaleMessages = (): { JP: Record<string, string>; EN: Record<string, string> } => {
  return {
    JP: {
      // 名前関連
      [`name.${ErrorCodes.REQUIRED}`]: '名前は必須です',
      [`name.${ErrorCodes.INVALID}`]: '名前が無効です',
      [`name.${ErrorCodes.INVALID_FORMAT}`]: '名前の形式が正しくありません',
      
      // メールアドレス関連
      [`email.${ErrorCodes.REQUIRED}`]: 'メールアドレスは必須です',
      [`email.${ErrorCodes.INVALID}`]: '有効なメールアドレスを入力してください',
      [`email.${ErrorCodes.INVALID_FORMAT}`]: 'メールアドレスの形式が正しくありません',
      
      // パスワード関連
      [`password.${ErrorCodes.REQUIRED}`]: 'パスワードは必須です',
      [`password.${ErrorCodes.TOO_SHORT}`]: 'パスワードは8文字以上である必要があります',
      [`password.${ErrorCodes.INVALID}`]: 'パスワードが無効です',
      [`password.${ErrorCodes.INVALID_FORMAT}`]: 'パスワードは大文字、小文字、数字を含む必要があります',
      
      // 年齢関連
      [`age.${ErrorCodes.INVALID}`]: '年齢は数値である必要があります',
      [`age.${ErrorCodes.INVALID_FORMAT}`]: '年齢は整数である必要があります',
      [`age.${ErrorCodes.TOO_SMALL}`]: '年齢は0以上である必要があります',
      [`age.${ErrorCodes.TOO_LARGE}`]: '年齢は150以下である必要があります',
      
      // 性別関連
      [`gender.${ErrorCodes.REQUIRED}`]: '性別を選択してください',
      [`gender.${ErrorCodes.INVALID}`]: '性別が無効です',
      
      // 国籍関連
      [`country.${ErrorCodes.REQUIRED}`]: '国籍を選択してください',
      [`country.${ErrorCodes.INVALID}`]: '有効な国籍を選択してください',
      
      // 自己紹介関連
      [`bio.${ErrorCodes.TOO_LONG}`]: '自己紹介は1000文字以内で入力してください',
      
      // 利用規約関連
      [`agreeTerms.${ErrorCodes.REQUIRED}`]: '利用規約に同意する必要があります',
      
      // 一般的なエラー
      'form.invalid': 'フォームに入力エラーがあります',
      'form.submission_failed': 'フォームの送信に失敗しました'
    },
    EN: {
      // Name related
      [`name.${ErrorCodes.REQUIRED}`]: 'Name is required',
      [`name.${ErrorCodes.INVALID}`]: 'Name is invalid',
      [`name.${ErrorCodes.INVALID_FORMAT}`]: 'Name format is invalid',
      
      // Email related
      [`email.${ErrorCodes.REQUIRED}`]: 'Email is required',
      [`email.${ErrorCodes.INVALID}`]: 'Email is invalid',
      [`email.${ErrorCodes.INVALID_FORMAT}`]: 'Please enter a valid email address',
      
      // Password related
      [`password.${ErrorCodes.REQUIRED}`]: 'Password is required',
      [`password.${ErrorCodes.TOO_SHORT}`]: 'Password must be at least 8 characters',
      [`password.${ErrorCodes.INVALID}`]: 'Password is invalid',
      [`password.${ErrorCodes.INVALID_FORMAT}`]: 'Password must contain uppercase, lowercase, and numeric characters',
      
      // Age related
      [`age.${ErrorCodes.INVALID}`]: 'Age is invalid',
      [`age.${ErrorCodes.INVALID_FORMAT}`]: 'Age must be an integer',
      [`age.${ErrorCodes.TOO_SMALL}`]: 'Age must be at least 0',
      [`age.${ErrorCodes.TOO_LARGE}`]: 'Age must be at most 150',
      
      // Gender related
      [`gender.${ErrorCodes.REQUIRED}`]: 'Please select a gender',
      [`gender.${ErrorCodes.INVALID}`]: 'Gender is invalid',
      
      // Country related
      [`country.${ErrorCodes.REQUIRED}`]: 'Please select a country',
      [`country.${ErrorCodes.INVALID}`]: 'Please select a valid country',
      
      // Bio related
      [`bio.${ErrorCodes.TOO_LONG}`]: 'Bio must be at most 1000 characters',
      
      // Terms agreement related
      [`agreeTerms.${ErrorCodes.REQUIRED}`]: 'You must agree to the terms',
      
      // General errors
      'form.invalid': 'There are errors in the form',
      'form.submission_failed': 'Form submission failed'
    }
  };
};
