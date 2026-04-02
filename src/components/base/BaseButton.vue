<script setup lang="ts">
defineProps<{
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()

defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<template>
  <button
    class="base-btn"
    :type="type ?? 'button'"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-btn {
  appearance: none;
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  padding: 8px 14px;
  background: var(--c-button-face);
  color: var(--c-text);
  border: 1px solid var(--c-border);
  cursor: pointer;
  white-space: nowrap;
}

.base-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.base-btn:not(:disabled):hover {
  background: #f3f3f3;
}

.base-btn:not(:disabled):active {
  background: #e8e8e8;
}
</style>
