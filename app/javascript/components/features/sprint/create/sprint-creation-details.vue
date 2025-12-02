<script setup lang="ts">
import { computed } from 'vue'
import { CalendarClock } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent } from '@ui/card'
import { Checkbox } from '@ui/checkbox'
import { Label } from '@ui/label'
import InputForm from './sprint-creation-forms.vue'
import type { SprintCreationDetailView } from '@domain/model/view/sprint-creation-view'

const props = defineProps<{
  modelValue: SprintCreationDetailView
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: SprintCreationDetailView): void
}>()

const details = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <Card class="bg-card shadow-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base flex items-center gap-2">
        <CalendarClock class="h-4 w-4 text-sky-400" />
        Sprint details
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-4 text-sm">
      <div class="grid md:grid-cols-2 gap-3">
        <InputForm
          id="sprint-name"
          v-model="details.name"
          type="text"
          label="Sprint name"
          placeholder="Sprint 12 – Checkout v2"
          required
        />

        <Label
          class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950"
        >
          <Checkbox
            class="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
            v-model="details.isActive"
          />
          <div class="grid gap-1.5 font-normal">
            <p class="text-sm leading-none font-medium">Active sprint</p>
            <p class="text-muted-foreground text-sm">Mark as current Sprint.</p>
          </div>
        </Label>
      </div>

      <div class="grid md:grid-cols-2 gap-3">
        <InputForm
          id="start-date"
          v-model="details.startDate"
          type="date"
          label="Start date"
          required
        />
        <InputForm id="end-date" v-model="details.endDate" type="date" label="End date" required />
      </div>

      <InputForm
        id="sprint-goal"
        v-model="details.goal"
        type="textarea"
        label="Sprint goal"
        placeholder="Deliver guest checkout and reduce payment failure rate below 1%."
      />

      <div class="grid md:grid-cols-2 gap-3">
        <InputForm
          id="capacity-hours"
          v-model.number="details.capacityHours"
          type="number"
          label="Team capacity (hours)"
          placeholder="e.g. 96"
        />

        <InputForm
          id="velocity-forecast"
          v-model.number="details.velocityForecast"
          type="number"
          label="Velocity forecast (story points)"
          placeholder="e.g. 28"
          min="0"
        />
      </div>
    </CardContent>
  </Card>
</template>
