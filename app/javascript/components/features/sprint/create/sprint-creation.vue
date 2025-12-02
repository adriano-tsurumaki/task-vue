<script setup lang="ts">
import { ref, inject, watch, reactive, computed } from 'vue'
import { Rocket, ArrowUpRightIcon } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

import { Card, CardContent } from '@ui/card'
import { Button } from '@ui/button'

import SprintCreationDetails from './sprint-creation-details.vue'
import type {
  SprintCreationBoardView,
  SprintCreationColumnView,
  SprintCreationDetailView,
} from '@/domain/model/view/sprint-creation-view'
import { SPRINT_CREAT_REPO } from '@/infrastructure/factory/sprint-creat-repo-factory'
import type { SprintCreationRepository } from '@/domain/repositories/sprint-creat-repository'
import SprintCreationBoard from './sprint-creation-board.vue'

// Inject your repositories (configure in app.provide / plugin)
const sprintRepo = inject<SprintCreationRepository | null>(SPRINT_CREAT_REPO, null)

const columns = [
  {
    key: 1,
    title: 'To Do',
    wipLimit: undefined,
    order: 1,
    statuses: ['to_do'],
  },
  {
    key: 2,
    title: 'In Progress',
    wipLimit: undefined,
    order: 2,
    statuses: ['in_progress'],
  },
  {
    key: 3,
    title: 'Review',
    wipLimit: undefined,
    order: 3,
    statuses: ['review', 'in_review'],
  },
  {
    key: 4,
    title: 'Done',
    wipLimit: undefined,
    order: 4,
    statuses: ['done'],
  },
] as SprintCreationColumnView[]

const form = reactive({
  sprint: {
    name: '',
    goal: '',
    startDate: '',
    endDate: '',
    capacityHours: 0,
    velocityForecast: 0,
    isActive: false,
  } as SprintCreationDetailView,
  board: {
    id: undefined,
    mode: 'existing-board',
    name: '',
    description: '',
    columns,
  } as SprintCreationBoardView,
})

const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const canSubmit = computed(() => {
  if (!form.sprint.name.trim()) return false
  if (!form.sprint.startDate || !form.sprint.endDate) return false

  if (form.board.mode === 'existing-board' && !form.board.id) return false
  if (form.board.mode === 'new-board' && !form.board.name && form.board.columns.length === 0)
    return false

  return true
})

function resetForm() {
  const initialSprint = {
    name: '',
    isActive: false,
    goal: '',
    startDate: '',
    endDate: '',
    capacityHours: 0,
    velocityForecast: 0,
  } as SprintCreationDetailView

  const initialBoard = {
    id: undefined,
    mode: 'existing-board',
    name: '',
    description: '',
    columns,
  } as SprintCreationBoardView

  Object.assign(form.sprint, initialSprint)
  Object.assign(form.board, initialBoard)
}

async function handleSubmit() {
  if (!sprintRepo) {
    errorMessage.value = 'SprintRepository not provided. Make sure to provide it in your app setup.'
    return
  }

  if (!canSubmit.value) {
    errorMessage.value = 'Please fill in the required fields.'
    return
  }

  try {
    isSubmitting.value = true
    let idBoard = 0

    if (form.board.mode === 'new-board') {
      idBoard = await sprintRepo.createBoardWithColumns(form.board)
    }

    if (idBoard === 0) {
      throw new Error('Failed to create sprint')
    }

    sprintRepo.createSprint(form.sprint, idBoard)

    toast('Sprint created with successfully', {
      position: 'top-right',
    })
    resetForm()
  } catch (error) {
    console.error('Failed to create sprint:', error)
    errorMessage.value = (error as Error).message || 'Failed to create sprint. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

watch(successMessage, (newValue) => {
  if (!newValue) {
    return
  }

  toast('An error has occured', {
    description: newValue,
    position: 'top-right',
  })

  successMessage.value = ''
})

watch(errorMessage, (newValue) => {
  if (!newValue) {
    return
  }

  toast('An error has occured', {
    description: newValue,
    position: 'top-right',
  })

  errorMessage.value = ''
})
</script>

<template>
  <div class="flex flex-col gap-4 p-6">
    <section
      class="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 md:flex-row md:items-center md:justify-between"
    >
      <div class="flex items-center gap-3">
        <div class="h-9 w-9 rounded-2xl bg-blue-500 flex items-center justify-center">
          <Rocket class="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 class="text-xl font-semibold">Sprint Creation</h2>
          <p class="text-sm text-slate-500">
            Define your new sprint and configure its board to get started.
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" @click="$router.push('/sprint/backlog')">
        Back to Sprint Backlog
        <ArrowUpRightIcon class="ml-1 h-4 w-4" />
      </Button>
    </section>

    <SprintCreationDetails v-model="form.sprint" />

    <SprintCreationBoard v-model="form.board" />

    <Card class="bg-card shadow-sm">
      <CardContent>
        <p class="text-sm text-slate-600">
          When you create this Sprint, it will be linked to the selected board. Your existing Sprint
          Backlog page can then filter stories by this Sprint.
        </p>
        <div class="flex items-center justify-between pt-1">
          <div class="flex flex-col gap-0.5">
            <p class="text-sm" :class="canSubmit ? 'text-emerald-300' : 'text-slate-500'">
              {{
                canSubmit
                  ? 'Ready to create sprint.'
                  : 'Fill the required fields to create this sprint.'
              }}
            </p>
          </div>
          <Button @click="handleSubmit" :disabled="!canSubmit">
            {{ isSubmitting ? 'Creating...' : 'Create sprint' }}
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
