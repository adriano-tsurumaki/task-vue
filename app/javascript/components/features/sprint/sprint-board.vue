<script setup lang="ts">
import { Badge } from '@ui/badge'
import SprintBoardEmpty from './sprint-board-empty.vue'
import { useSprintBoard } from './useSprintBoard'

const { sprintBoard } = useSprintBoard(1)
</script>

<template>
  <div v-if="!sprintBoard" class="h-screen w-full flex justify-center items-center">
    <SprintBoardEmpty />
  </div>
  <div v-else class="h-screen w-full grid grid-rows-12 grid-cols-1">
    <div class="row-span-2"></div>
    <div class="bg-neutral-100 flex row-span-10 overflow-auto flex-nowrap *:shrink-0">
      <div v-for="i in 10" :key="i" class="h-full w-64 flex flex-col p-2">
        <div class="flex items-center gap-2 mb-2">
          <h1 class="font-semibold text-foreground">Column Name</h1>
          <Badge variant="outline">
            {{ i }}
          </Badge>
        </div>
        <div
          class="grow rounded-lg border text-card-foreground shadow-sm p-3 bg-secondary/50 border-border flex flex-col gap-3"
        >
          <div
            v-for="i in 10"
            :key="i"
            class="space-y-3 select-none rounded-lg border text-card-foreground shadow-sm p-4 hover:shadow-md transition-all duration-200 cursor-pointer border-border bg-card active:scale-[0.98]"
          >
            <div class="flex items-start justify-between gap-2">
              <h4 class="font-medium text-card-foreground line-clamp-2">
                Implementar autenticação
              </h4>
              <div
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-destructive/10 text-destructive border-destructive/20"
              >
                Alta
              </div>
            </div>
            <p class="text-sm text-muted-foreground line-clamp-2">
              Adicionar sistema de login e registro de usuários
            </p>
            <div class="flex items-center gap-2 pt-1 border-t border-border/50">
              <span class="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6">
                <span
                  class="flex h-full w-full items-center justify-center rounded-full text-xs bg-primary/10 text-primary"
                >
                  AJ
                </span>
              </span>
              <span class="text-xs text-muted-foreground">Alice Johnson</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
