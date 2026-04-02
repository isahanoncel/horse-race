<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import { BaseButton, BaseTypography } from '@/components/base'
import HorseListPanel from '@/components/horse/HorseListPanel.vue'
import ProgramColumn from '@/components/race/ProgramColumn.vue'
import RaceTrack from '@/components/race/RaceTrack.vue'
import ResultsColumn from '@/components/race/ResultsColumn.vue'
import type { RootState } from '@/store/types'

const store = useStore<RootState>()

onMounted(() => {
  store.dispatch('horses/initialize')
})

const genDisabled = computed(() => store.state.race.running)
const spDisabled = computed(() => !store.getters['race/hasSchedule'])

function onGenerate() {
  store.dispatch('race/generate')
}

function onStartPause() {
  if (!store.getters['race/hasSchedule']) return
  if (store.state.race.running) {
    store.dispatch('race/togglePause')
  } else {
    void store.dispatch('race/start')
  }
}
</script>

<template>
  <div class="view">
    <header class="top">
      <BaseTypography as="h1" variant="brand">Horse Racing</BaseTypography>
      <div class="actions">
        <BaseButton :disabled="genDisabled" @click="onGenerate">GENERATE PROGRAM</BaseButton>
        <BaseButton :disabled="spDisabled" @click="onStartPause">START / PAUSE</BaseButton>
      </div>
    </header>
    <div class="main">
      <aside class="left">
        <HorseListPanel />
      </aside>
      <section class="center">
        <RaceTrack />
      </section>
      <aside class="right">
        <ProgramColumn />
        <ResultsColumn />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 14px;
  background: var(--c-header);
  border-bottom: 1px solid var(--c-border);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}

.main {
  flex: 1;
  display: flex;
  min-height: 0;
}

.left {
  width: min(300px, 34vw);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--c-border);
  background: #fff;
}

.center {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: var(--c-track);
}

.right {
  width: min(480px, 42vw);
  flex-shrink: 0;
  display: flex;
  min-height: 0;
}

@media (max-width: 960px) {
  .main {
    flex-direction: column;
  }

  .left,
  .right {
    width: 100%;
  }

  .right {
    min-height: 360px;
  }
}
</style>
