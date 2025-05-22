/**
 * 複数の関数を合成して、パイプライン処理を行うユーティリティ関数
 * @param fns 合成する関数の配列
 * @returns 合成された関数
 */
export const pipe = <T>(...fns: Array<(arg: T) => T>) => 
  (value: T): T => fns.reduce((acc, fn) => fn(acc), value);

/**
 * 複数の非同期関数を合成して、非同期パイプライン処理を行うユーティリティ関数
 * @param fns 合成する非同期関数の配列
 * @returns 合成された非同期関数
 */
export const asyncPipe = <T>(...fns: Array<(arg: T) => Promise<T>>) => 
  async (value: T): Promise<T> => {
    let result = value;
    for (const fn of fns) {
      result = await fn(result);
    }
    return result;
  };
