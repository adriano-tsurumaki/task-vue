<script setup lang="ts">
import { liveQuery } from 'dexie'
import { from } from 'rxjs'
import { useObservable } from '@vueuse/rxjs'
import { db, type Board } from '../../infrastructure/dexie/db'
import { useSelectedBoardStore } from '@/stores/selected-board'
import { computed } from 'vue'

const boards = useObservable<Board[]>(from(liveQuery(() => db.boards.toArray())))

const $store = useSelectedBoardStore()
const isSelected = computed(() => (boardId: number) => boardId === $store.selectedBoardId)
</script>

<template>
  <ul>
    <li
      v-for="board in boards"
      :key="board.id"
      @click="() => $store.setSelectedBoardId(board.id!)"
      :style="{
        backgroundColor: isSelected(board.id!) ? 'blue' : 'transparent',
      }"
    >
      {{ board.name }}
    </li>
  </ul>
</template>
