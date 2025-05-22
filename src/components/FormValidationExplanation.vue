<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">
      フォームバリデーションの説明
    </h2>

    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-700">実装アーキテクチャ</h3>
      <p class="text-gray-600">
        このフォームは関数型プログラミング（FP）アプローチとDomain-Driven
        Design（DDD）の原則に基づいて実装されています。
      </p>

      <div class="bg-gray-50 p-4 rounded-md">
        <h4 class="font-medium text-gray-700 mb-2">主要コンポーネント</h4>
        <ul class="list-disc pl-5 space-y-1 text-gray-600">
          <li>
            <span class="font-mono text-indigo-600">ValueObject</span> -
            各フォームフィールドの値と検証ロジックをカプセル化
          </li>
          <li>
            <span class="font-mono text-indigo-600">FormObject</span> -
            フォーム全体の値と検証ロジックをカプセル化
          </li>
          <li>
            <span class="font-mono text-indigo-600">Repository</span> -
            データアクセスと操作を抽象化
          </li>
          <li>
            <span class="font-mono text-indigo-600">UseCase</span> -
            アプリケーションのビジネスロジックを実装
          </li>
          <li>
            <span class="font-mono text-indigo-600">Service</span> -
            ドメイン層とプレゼンテーション層の橋渡し
          </li>
        </ul>
      </div>

      <h3 class="text-lg font-semibold text-gray-700">
        Zodによるバリデーション
      </h3>
      <p class="text-gray-600">
        各フィールドのバリデーションはZodライブラリを使用して実装されています。Zodはスキーマベースのバリデーションライブラリで、TypeScriptの型安全性を活用します。
      </p>

      <div class="bg-gray-50 p-4 rounded-md">
        <h4 class="font-medium text-gray-700 mb-2">バリデーションルール例</h4>
        <ul class="list-disc pl-5 space-y-1 text-gray-600">
          <li><span class="font-medium">名前</span>: 必須</li>
          <li>
            <span class="font-medium">メールアドレス</span>:
            必須、有効なメールアドレス形式
          </li>
          <li>
            <span class="font-medium">パスワード</span>:
            必須、8文字以上、大文字・小文字・数字を含む
          </li>
          <li><span class="font-medium">年齢</span>: 数値、0以上150以下</li>
          <li><span class="font-medium">性別</span>: 必須、選択肢から選択</li>
          <li><span class="font-medium">国籍</span>: 必須、選択肢から選択</li>
          <li>
            <span class="font-medium">自己紹介</span>: オプション、1000文字以内
          </li>
          <li>
            <span class="font-medium">利用規約同意</span>:
            必須、trueである必要がある
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// このコンポーネントはフォームバリデーションの説明を表示するだけなので、
// 特別なロジックは必要ありません。
</script>
