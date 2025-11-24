import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSelectedBoardStore = defineStore('selected-board', () => {
  const selectedBoardId = ref<number | null>(null)

  function setSelectedBoardId(id: number | null) {
    selectedBoardId.value = id
  }

  return { selectedBoardId, setSelectedBoardId }
})
