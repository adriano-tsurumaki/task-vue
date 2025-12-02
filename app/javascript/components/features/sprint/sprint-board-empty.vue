<script setup lang="ts">
import { FolderCode } from 'lucide-vue-next'
import { Button } from '@ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@ui/empty'
import { useRouter } from 'vue-router'

const router = useRouter()

const createSprint = () => {
  router.push('/sprint/new')
}

const viewBacklog = () => {
  router.push('/sprint/backlog')
}
</script>

<template>
  <Empty class="rounded-xl border bg-secondary/30 p-8 shadow-sm flex-none">
    <EmptyHeader>
      <EmptyMedia variant="icon" class="animate-pulse">
        <FolderCode />
      </EmptyMedia>
      <EmptyTitle>No Sprint Yet</EmptyTitle>
      <EmptyDescription>
        Create your first sprint to start organizing work, tracking progress, and planning
        deliverables.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <div class="flex gap-2">
        <Button @click="createSprint">Create Sprint</Button>
        <Button variant="outline" @click="viewBacklog">View Sprint Backlog</Button>
      </div>
    </EmptyContent>
  </Empty>
</template>
