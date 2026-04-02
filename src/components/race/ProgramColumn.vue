<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

import { BaseTable } from '@/components/base'
import type { RootState } from '@/store/types'
import type { ScheduledRound } from '@/types'
import { programLapLabel } from '@/utils/race/lapLabels'

const store = useStore<RootState>()
const schedule = computed((): ScheduledRound[] | null => store.state.race.schedule)
</script>

<template>
  <div class="col">
    <div class="head-program">
      <h2 class="ttl">Program</h2>
    </div>
    <div class="body">
      <template v-if="schedule?.length">
        <template v-for="(round, i) in schedule" :key="`${round.distanceM}-${i}`">
          <div class="lap-band">
            <span class="lap-txt">{{ programLapLabel(i, round.distanceM) }}</span>
          </div>
          <BaseTable dense>
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(h, pi) in round.horses" :key="h.id">
                <td>{{ pi + 1 }}</td>
                <td>{{ h.name }}</td>
              </tr>
            </tbody>
          </BaseTable>
        </template>
      </template>
      <div v-else class="placeholder" />
    </div>
  </div>
</template>

<style scoped>
.col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-right: 1px solid var(--c-border);
  background: #fff;
}

.head-program {
  flex-shrink: 0;
  background: var(--c-program);
  border-bottom: 1px solid var(--c-border);
  padding: 6px 8px;
}

.ttl {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  font-family: var(--font-ui);
}

.body {
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.lap-band {
  flex-shrink: 0;
  background: var(--c-lap-band);
  padding: 4px 6px;
  border-bottom: 1px solid var(--c-border);
}

.lap-txt {
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  font-family: var(--font-ui);
  text-transform: uppercase;
}

.placeholder {
  flex: 1;
  min-height: 120px;
  background: #fafafa;
}
</style>
