<script setup lang="ts">
const emit = defineEmits<{
  (e: "submit", data: Partial<unknown>): void;
}>();

const handleSubmit = (e: Event) => {
  const form = e.target as HTMLFormElement;
  const data = Object.fromEntries(new FormData(form));

  emit("submit", data);

  form.reset();
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <slot></slot>
  </form>
</template>
