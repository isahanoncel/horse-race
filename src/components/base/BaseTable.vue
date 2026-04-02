<script setup lang="ts">
defineProps<{
  dense?: boolean
  fill?: boolean
}>()
</script>

<template>
  <div class="base-table-scroll" :class="{ fill: fill }">
    <table class="base-table" :class="{ dense: dense }">
      <slot />
    </table>
  </div>
</template>

<style scoped>
.base-table-scroll {
  border: 1px solid var(--c-border);
  background: #fff;
}

.base-table-scroll.fill {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.base-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.base-table :deep(th),
.base-table :deep(td) {
  border: 1px solid var(--c-border);
  padding: 4px 6px;
  text-align: left;
  vertical-align: top;
}

.base-table.dense :deep(th),
.base-table.dense :deep(td) {
  padding: 2px 4px;
  font-size: 11px;
}
</style>
