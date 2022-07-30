<script setup lang="ts">
import type Field from "@/interfaces/Field";

defineProps<{
  element: string;
  id: string;
  name: string;
  type?: string;
  options?: Field[];
}>();
</script>

<template>
  <input
    v-if="element === 'input'"
    class="input input-bordered"
    :id="id"
    :name="name"
    :type="type"
    required
  />
  <select
    v-else-if="element == 'select'"
    class="input input-bordered"
    :id="id"
    :name="name"
    required
  >
    <slot />
  </select>
  <textarea
    v-else-if="element == 'textarea'"
    class="textarea textarea-bordered"
    :id="id"
    :name="name"
    required
  ></textarea>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
