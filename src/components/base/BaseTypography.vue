<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    as?: string
    variant?: 'brand' | 'section' | 'lap' | 'finish' | 'body' | 'band'
  }>(),
  { as: 'span', variant: 'body' },
)

const cls = computed(() => {
  const v = props.variant
  if (v === 'brand') return 'is-brand'
  if (v === 'section') return 'is-section'
  if (v === 'lap') return 'is-lap'
  if (v === 'finish') return 'is-finish'
  if (v === 'band') return 'is-band'
  return 'is-body'
})
</script>

<template>
  <component :is="as" class="base-type" :class="cls">
    <slot />
  </component>
</template>

<style scoped>
.base-type {
  margin: 0;
  font-family: var(--font-ui);
  color: var(--c-text);
}

.is-brand {
  font-size: 22px;
  font-weight: 700;
}

.is-section {
  font-size: 14px;
  font-weight: 700;
}

.is-lap {
  font-size: 13px;
  font-weight: 700;
  color: var(--c-finish-text);
}

.is-finish {
  font-size: 13px;
  font-weight: 800;
  color: var(--c-finish-text);
  text-transform: uppercase;
}

.is-band {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}

.is-body {
  font-size: 13px;
  font-weight: 400;
}
</style>
