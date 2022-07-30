<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const handleClickOutside = (e: Event) => {
  const element = e.target as HTMLElement;
  if (element.classList.contains("modal")) emit("close");
};
</script>

<template>
  <div>
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isOpen"
          class="modal modal-open cursor-pointer"
          @mousedown="handleClickOutside"
        >
          <div class="modal-box cursor-auto">
            <slot />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
