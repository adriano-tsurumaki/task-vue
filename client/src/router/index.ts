import { createRouter, createWebHistory } from 'vue-router'

import SprintBacklog from '@features/sprint/sprint-backlog.vue'
import SprintBoard from '@features/sprint/sprint-board.vue'
import SprintCreation from '@/components/features/sprint/create/sprint-creation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/sprint/backlog', component: SprintBacklog },
    { path: '/sprint/board', component: SprintBoard },
    { path: '/sprint/new', component: SprintCreation },
    { path: '/sprint/active', component: SprintCreation },
    { path: '/sprint/goals', component: SprintCreation },
    { path: '/sprint/impediments', component: SprintCreation },
  ],
})

export default router
