<script setup lang="ts">
import { ref } from 'vue'
import { db } from '../../infrastructure/dexie/db'

const boardName = ref('')

const addBoard = async () => {
  if (boardName.value.trim() === '') return
  await db.boards.add({
    name: boardName.value.trim(),
    createdAt: new Date().toDateString(),
    archived: false,
    updatedAt: new Date().toDateString(),
  })
  boardName.value = ''
}
</script>

<template>
  <fieldset>
    <legend>Board</legend>
    <label>
      Board Name:
      <input type="text" v-model="boardName" />
    </label>
    <button type="button" @click="addBoard">Add Board</button>
  </fieldset>
</template>
