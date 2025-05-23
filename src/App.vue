<script setup lang="ts">
import FormSample from "./components/FormSample.vue";
import FormValidationExplanation from "./components/FormValidationExplanation.vue";
</script>

<template>
  <div class="min-w-screen min-h-screen p-8">
    <div class="flex flex-col md:flex-row gap-8 justify-center items-start">
      <FormSample class="w-[450px]" />
      <FormValidationExplanation class="w-[600px]" />
    </div>
  </div>
</template>
