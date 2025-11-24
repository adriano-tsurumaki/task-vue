<script setup lang="ts">
import 'vue-sonner/style.css'
import { SidebarInset, SidebarProvider } from '@ui/sidebar'
import SidebarMenu from '@components/sidebar/sidebar-menu.vue'
import { Toaster } from '@components/ui/sonner'
</script>

<template>
  <SidebarProvider>
    <SidebarMenu />
    <SidebarInset>
      <RouterView />
      <Toaster />
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
