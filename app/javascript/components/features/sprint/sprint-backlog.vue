<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge } from '@ui/badge'

type TaskStatus = 'todo' | 'in-progress' | 'blocked' | 'done'

interface Task {
  id: number
  title: string
  status: TaskStatus
  assignee: string
  estimateHours: number
}

interface Story {
  id: number
  key: string
  title: string
  points: number
  priority: 'Low' | 'Medium' | 'High'
  status: 'To Do' | 'In Progress' | 'Done'
  assignee: string
  tags: string[]
  tasks: Task[]
}

interface Sprint {
  name: string
  goal: string
  startDate: string
  endDate: string
  committedPoints: number
  completedPoints: number
}

const sprint = ref<Sprint>({
  name: 'Sprint 15 – Checkout Refactor',
  goal: 'Improve checkout conversion by refactoring the cart & payment flow.',
  startDate: '2025-11-10',
  endDate: '2025-11-24',
  committedPoints: 55,
  completedPoints: 32,
})

const stories = ref<Story[]>([
  {
    id: 1,
    key: 'PROJ-123',
    title: 'As a user, I can save my cart',
    points: 5,
    priority: 'High',
    status: 'In Progress',
    assignee: 'Alice',
    tags: ['Frontend', 'Checkout'],
    tasks: [
      {
        id: 1,
        title: 'Design saved cart UX',
        status: 'done',
        assignee: 'UX – Maia',
        estimateHours: 3,
      },
      {
        id: 2,
        title: 'Implement saved cart API integration',
        status: 'in-progress',
        assignee: 'Alice',
        estimateHours: 5,
      },
      {
        id: 3,
        title: 'Unit tests for cart reducer',
        status: 'todo',
        assignee: 'Alice',
        estimateHours: 2,
      },
    ],
  },
  {
    id: 2,
    key: 'PROJ-130',
    title: 'As a user, I can apply discount coupons at checkout',
    points: 8,
    priority: 'High',
    status: 'To Do',
    assignee: 'Bruno',
    tags: ['Backend', 'Payments'],
    tasks: [
      {
        id: 4,
        title: 'Define coupon validation rules',
        status: 'todo',
        assignee: 'PO – Leo',
        estimateHours: 2,
      },
      {
        id: 5,
        title: 'Implement coupon validation endpoint',
        status: 'todo',
        assignee: 'Bruno',
        estimateHours: 6,
      },
      {
        id: 6,
        title: 'Add error states on UI',
        status: 'todo',
        assignee: 'Carol',
        estimateHours: 3,
      },
    ],
  },
  {
    id: 3,
    key: 'PROJ-140',
    title: 'Track checkout funnel events in analytics',
    points: 3,
    priority: 'Medium',
    status: 'Done',
    assignee: 'Carol',
    tags: ['Analytics'],
    tasks: [
      {
        id: 7,
        title: 'Define funnel events with PO',
        status: 'done',
        assignee: 'PO – Leo',
        estimateHours: 1,
      },
      {
        id: 8,
        title: 'Implement tracking in frontend',
        status: 'done',
        assignee: 'Carol',
        estimateHours: 3,
      },
      {
        id: 9,
        title: 'Validate data on dashboard',
        status: 'done',
        assignee: 'Carol',
        estimateHours: 2,
      },
    ],
  },
])

const assigneeFilter = ref<string>('all')
const statusFilter = ref<'all' | TaskStatus>('all')
const search = ref('')

const completionRate = computed(() => {
  const { committedPoints, completedPoints } = sprint.value
  if (!committedPoints) return 0
  return Math.round((completedPoints / committedPoints) * 100)
})

const totalStories = computed(() => stories.value.length)

const totalTasks = computed(() => stories.value.reduce((sum, story) => sum + story.tasks.length, 0))

const filteredStories = computed(() => {
  return stories.value.filter((story) => {
    const matchesSearch =
      !search.value ||
      story.title.toLowerCase().includes(search.value.toLowerCase()) ||
      story.key.toLowerCase().includes(search.value.toLowerCase())

    const matchesAssignee =
      assigneeFilter.value === 'all' ||
      story.assignee === assigneeFilter.value ||
      story.tasks.some((t) => t.assignee === assigneeFilter.value)

    const matchesStatus =
      statusFilter.value === 'all' || story.tasks.some((t) => t.status === statusFilter.value)

    return matchesSearch && matchesAssignee && matchesStatus
  })
})

const allAssignees = computed(() => {
  const set = new Set<string>()
  stories.value.forEach((s) => {
    set.add(s.assignee)
    s.tasks.forEach((t) => set.add(t.assignee))
  })
  return Array.from(set)
})

function storyTaskCompletion(story: Story) {
  const done = story.tasks.filter((t) => t.status === 'done').length
  const total = story.tasks.length || 1
  return Math.round((done / total) * 100)
}

// function statusBadgeColor(status: Story['status']) {
//   switch (status) {
//     case 'To Do':
//       return 'bg-gray-100 text-gray-700'
//     case 'In Progress':
//       return 'bg-blue-100 text-blue-700'
//     case 'Done':
//       return 'bg-emerald-100 text-emerald-700'
//   }
// }
</script>

<template>
  <div class="flex flex-col gap-4 p-6">
    <!-- Sprint Header -->
    <section
      class="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 md:flex-row md:items-center md:justify-between"
    >
      <div class="space-y-2">
        <h1 class="text-xl font-semibold">
          {{ sprint.name }}
        </h1>
        <p class="text-sm text-muted-foreground">
          {{ sprint.goal }}
        </p>
        <p class="text-xs text-muted-foreground">{{ sprint.startDate }} → {{ sprint.endDate }}</p>
      </div>

      <div class="grid gap-3 text-sm md:grid-cols-3">
        <div class="space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs text-muted-foreground">Story Points&nbsp;</span>
            <span class="text-xs text-muted-foreground">
              {{ sprint.completedPoints }} / {{ sprint.committedPoints }}
            </span>
          </div>
          <div class="h-2 rounded-full bg-muted">
            <div
              class="h-2 rounded-full bg-emerald-500 transition-all"
              :style="{ width: completionRate + '%' }"
            />
          </div>
          <p class="text-xs text-muted-foreground">{{ completionRate }}% completed</p>
        </div>

        <div class="space-y-1">
          <p class="text-xs text-muted-foreground">Stories</p>
          <p class="text-lg font-semibold">
            {{ totalStories }}
          </p>
        </div>

        <div class="space-y-1">
          <p class="text-xs text-muted-foreground">Tasks</p>
          <p class="text-lg font-semibold">
            {{ totalTasks }}
          </p>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section
      class="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:flex-row md:items-end md:justify-between"
    >
      <div class="flex flex-wrap gap-3">
        <div class="flex flex-col text-sm">
          <label class="mb-1 text-xs font-medium text-muted-foreground">Assignee</label>
          <select
            v-model="assigneeFilter"
            class="h-9 rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value="all">All</option>
            <option v-for="assignee in allAssignees" :key="assignee" :value="assignee">
              {{ assignee }}
            </option>
          </select>
        </div>

        <div class="flex flex-col text-sm">
          <label class="mb-1 text-xs font-medium text-muted-foreground">Task Status</label>
          <select
            v-model="statusFilter"
            class="h-9 rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <div class="flex w-full gap-2 md:w-auto">
        <input
          v-model="search"
          type="text"
          placeholder="Search story or task..."
          class="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
    </section>

    <!-- Sprint Backlog: Stories + Tasks -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold text-muted-foreground">
        Sprint Backlog – {{ filteredStories.length }} stories
      </h2>

      <div class="grid gap-3">
        <article
          v-for="story in filteredStories"
          :key="story.id"
          class="rounded-xl border border-border bg-card p-4 shadow-sm"
        >
          <!-- Story header -->
          <header class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <span class="font-mono font-medium">{{ story.key }}</span>
                <span>·</span>
                <span>{{ story.points }} pts</span>
              </div>
              <h3 class="text-sm font-semibold">
                {{ story.title }}
              </h3>
              <div class="mt-1 flex flex-wrap gap-1 text-xs text-muted-foreground">
                <span
                  >Assignee: <span class="font-medium">{{ story.assignee }}</span></span
                >
                <span>·</span>
                <span>Priority: {{ story.priority }}</span>
                <span v-if="story.tags.length">·</span>
                <span
                  v-for="tag in story.tags"
                  :key="tag"
                  class="rounded-full bg-muted px-2 py-0.5"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="flex flex-col items-end gap-2">
              <!-- <span
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                :class="statusBadgeColor(story.status)"
              >
                {{ story.status }}
              </span> -->
              <Badge variant="secondary">
                {{ story.status }}
              </Badge>
              <div class="w-40 space-y-1">
                <div class="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Task completion</span>
                </div>
                <div class="h-2 rounded-full bg-muted">
                  <div
                    class="h-2 rounded-full bg-blue-500 transition-all"
                    :style="{ width: storyTaskCompletion(story) + '%' }"
                  />
                </div>
              </div>
            </div>
          </header>

          <!-- Tasks list -->
          <ul class="mt-4 space-y-2">
            <li
              v-for="task in story.tasks"
              :key="task.id"
              class="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-xs"
            >
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex h-3 w-3 rounded-full"
                  :class="{
                    'bg-gray-300': task.status === 'todo',
                    'bg-blue-400': task.status === 'in-progress',
                    'bg-amber-400': task.status === 'blocked',
                    'bg-emerald-400': task.status === 'done',
                  }"
                />
                <span
                  :class="{
                    'line-through text-muted-foreground': task.status === 'done',
                  }"
                >
                  {{ task.title }}
                </span>
              </div>

              <div class="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span>{{ task.estimateHours }}h</span>
                <span>{{ task.assignee }}</span>
                <span class="capitalize">{{ task.status.replace('-', ' ') }}</span>
              </div>
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>
