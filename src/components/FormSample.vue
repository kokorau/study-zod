<template>
  <form
    id="sample-form"
    class="p-6 bg-white rounded-2xl shadow-md space-y-6"
    @submit.prevent="handleSubmit"
  >
    <h2 class="text-2xl font-bold text-gray-800">登録フォーム</h2>

    <!-- 名前 -->
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700"
        >名前</label
      >
      <input
        type="text"
        id="name"
        v-model="formData.name"
        class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">
        {{ errors.name }}
      </p>
    </div>

    <!-- メール -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >メールアドレス</label
      >
      <input
        type="email"
        id="email"
        v-model="formData.email"
        class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
      />
      <p v-if="errors.email" class="mt-1 text-sm text-red-600">
        {{ errors.email }}
      </p>
    </div>

    <!-- パスワード -->
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700"
        >パスワード</label
      >
      <input
        type="password"
        id="password"
        v-model="formData.password"
        class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
      />
      <p v-if="errors.password" class="mt-1 text-sm text-red-600">
        {{ errors.password }}
      </p>
    </div>

    <!-- 年齢 -->
    <div>
      <label for="age" class="block text-sm font-medium text-gray-700"
        >年齢</label
      >
      <input
        type="number"
        id="age"
        v-model="formData.age"
        min="0"
        max="150"
        class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
      />
      <p v-if="errors.age" class="mt-1 text-sm text-red-600">
        {{ errors.age }}
      </p>
    </div>

    <!-- 性別（ラジオ） -->
    <div>
      <span class="block text-sm font-medium text-gray-700">性別</span>
      <div class="mt-2 space-x-4">
        <label class="inline-flex items-center">
          <input
            type="radio"
            name="gender"
            value="male"
            v-model="formData.gender"
            class="text-indigo-600"
          />
          <span class="ml-2 text-gray-700">男性</span>
        </label>
        <label class="inline-flex items-center">
          <input
            type="radio"
            name="gender"
            value="female"
            v-model="formData.gender"
            class="text-indigo-600"
          />
          <span class="ml-2 text-gray-700">女性</span>
        </label>
      </div>
      <p v-if="errors.gender" class="mt-1 text-sm text-red-600">
        {{ errors.gender }}
      </p>
    </div>

    <!-- 国籍（セレクト） -->
    <div>
      <label for="country" class="block text-sm font-medium text-gray-700"
        >国籍</label
      >
      <select
        id="country"
        v-model="formData.country"
        class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
      >
        <option value="">選択してください</option>
        <option value="jp">日本</option>
        <option value="us">アメリカ</option>
        <option value="uk">イギリス</option>
      </select>
      <p v-if="errors.country" class="mt-1 text-sm text-red-600">
        {{ errors.country }}
      </p>
    </div>

    <!-- 自己紹介 -->
    <div>
      <label for="bio" class="block text-sm font-medium text-gray-700"
        >自己紹介</label
      >
      <textarea
        id="bio"
        v-model="formData.bio"
        rows="4"
        class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
      ></textarea>
      <p v-if="errors.bio" class="mt-1 text-sm text-red-600">
        {{ errors.bio }}
      </p>
    </div>

    <!-- 利用規約同意 -->
    <div class="flex items-center">
      <input
        type="checkbox"
        id="agreeTerms"
        v-model="formData.agreeTerms"
        class="text-indigo-600 rounded"
      />
      <label for="agreeTerms" class="ml-2 text-sm text-gray-700"
        >利用規約に同意します</label
      >
      <p v-if="errors.agreeTerms" class="mt-1 text-sm text-red-600">
        {{ errors.agreeTerms }}
      </p>
    </div>

    <!-- 送信ボタン -->
    <div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? "送信中..." : "送信" }}
      </button>
    </div>

    <!-- 送信結果メッセージ -->
    <div
      v-if="submitMessage"
      :class="[
        'p-3 rounded-md text-center',
        submitSuccess
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800',
      ]"
    >
      {{ submitMessage }}
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { createFormRepository } from "../Infrastructure/Repository/FormRepositoryImpl";
import { createFormService } from "../Application/Service/FormService";
import { createSubmitFormUseCase } from "../Application/UseCase/SubmitFormUseCase";
import { match } from "../Domain/Common/Result";
import type { RegistrationFormData } from "../Domain/ValueObject/FormObject/RegistrationForm";

// リポジトリの初期化
const formRepository = createFormRepository();

// サービスの初期化
const formService = createFormService(formRepository, "JP");

// ユースケースの初期化
const submitFormUseCase = createSubmitFormUseCase(formRepository);

// フォームの状態
const formData = reactive<RegistrationFormData>({
  name: "",
  email: "",
  password: "",
  age: "",
  gender: "",
  country: "",
  bio: "",
  agreeTerms: false,
});

// バリデーションエラー
const errors = reactive<Record<string, string>>({});

// 送信状態
const isSubmitting = ref(false);
const submitMessage = ref("");
const submitSuccess = ref(false);

// フォーム送信
const handleSubmit = async () => {
  // エラーをクリア
  Object.keys(errors).forEach((key) => delete errors[key]);
  submitMessage.value = "";

  // フォームの検証
  const validationResult = formService.validate(formData);

  match(
    validationResult,
    async () => {
      // 検証成功
      isSubmitting.value = true;

      try {
        // ユースケースを使用してフォームを送信
        const submitResult = await submitFormUseCase.execute(formData);

        match(
          submitResult,
          () => {
            submitSuccess.value = true;
            submitMessage.value = "フォームが正常に送信されました！";
            // フォームのリセット
            Object.keys(formData).forEach((key) => {
              if (key === "agreeTerms") {
                formData[key as keyof typeof formData] = false;
              } else {
                formData[key as keyof typeof formData] = "";
              }
            });
          },
          (error) => {
            submitSuccess.value = false;

            // エラーの種類に応じてメッセージを設定
            if (error instanceof Error) {
              submitMessage.value = `エラー: ${error.message}`;
            } else if (Array.isArray(error)) {
              // ValidationError[]の場合
              const errorMessages = error.map((e) => e.message).join(", ");
              submitMessage.value = `検証エラー: ${errorMessages}`;
            } else {
              submitMessage.value = "エラーが発生しました";
            }
          },
        );
      } finally {
        isSubmitting.value = false;
      }
    },
    (validationErrors) => {
      // 検証エラー
      Object.assign(errors, validationErrors);
    },
  );
};
</script>
