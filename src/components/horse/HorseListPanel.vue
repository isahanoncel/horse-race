<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

import { BaseTable, BaseTypography } from '@/components/base'
import type { RootState } from '@/store/types'
import type { Horse } from '@/types'

const store = useStore<RootState>()
const horses = computed((): Horse[] => store.getters['horses/all'])
</script>

<template>
  <div class="horse-panel">
    <div class="horse-bar">
      <BaseTypography as="h2" variant="section">Horse List (1 - 20)</BaseTypography>
    </div>
    <BaseTable fill>
      <thead>
        <tr>
          <th>Name</th>
          <th>Condition</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="h in horses" :key="h.id">
          <td>{{ h.name }}</td>
          <td>{{ h.condition }}</td>
          <td>{{ h.colorName }}</td>
        </tr>
      </tbody>
    </BaseTable>
  </div>
</template>

<style scoped>
.horse-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  background: #fff;
}

.horse-bar {
  flex-shrink: 0;
  background: var(--c-horselist-bar);
  border: 1px solid var(--c-border);
  border-bottom: none;
  padding: 6px 8px;
}
</style>
