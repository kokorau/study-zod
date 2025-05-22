<script setup lang="ts">
import FormSample from "./components/FormSample.vue";
import FormValidationExplanation from "./components/FormValidationExplanation.vue";
</script>

<template>
  <div class="min-w-screen min-h-screen p-8">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">
      Zod バリデーションサンプル
    </h1>

    <div class="flex flex-col md:flex-row gap-8 justify-center items-start">
      <FormSample class="md:w-[400px]" />
      <FormValidationExplanation class="md:w-[600px]" />
    </div>
  </div>
</template>
