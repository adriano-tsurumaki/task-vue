<script setup lang="ts">
import {
  PackageOpen,
  Rocket,
  BarChart3,
  Users2,
  CalendarClock,
  Settings2,
  ChevronRight,
  LucideChevronsUpDown,
  GalleryVerticalEnd,
} from 'lucide-vue-next'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarFooter,
} from '@ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@ui/dropdown-menu'
import { useRoute } from 'vue-router'
import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar'
import { watch, ref } from 'vue'

const sections = [
  {
    title: 'Product',
    url: '/product',
    icon: PackageOpen,
    items: [
      { title: 'Product Backlog', url: '/backlog' },
      { title: 'Epics & Themes', url: '/epics' },
      { title: 'Roadmap', url: '/roadmap' },
      { title: 'Releases', url: '/releases' },
      { title: 'Product Goals', url: '/goals' },
    ],
  },
  {
    title: 'Sprint',
    url: '/sprint',
    icon: Rocket,
    items: [
      { title: 'Create Sprint', url: '/new' },
      { title: 'Active Sprint', url: '/active' },
      { title: 'Sprint Backlog', url: '/backlog' },
      { title: 'Sprint Board', url: '/board' },
      { title: 'Sprint Goals', url: '/goals' },
      { title: 'Impediments', url: '/impediments' },
    ],
  },
  {
    title: 'Metrics',
    url: '/metric',
    icon: BarChart3,
    items: [
      { title: 'Burndown', url: '/burndown' },
      { title: 'Burnup', url: '/burnup' },
      { title: 'Velocity', url: '/velocity' },
      { title: 'CFD', url: '/cfd' },
      { title: 'Lead & Cycle Time', url: '/lead' },
      { title: 'Throughput', url: '/throughput' },
    ],
  },
  {
    title: 'Events',
    url: '/event',
    icon: CalendarClock,
    items: [
      { title: 'Overview Dashboard', url: '/overview' },
      { title: 'Sprint Planning', url: '/planning' },
      { title: 'Daily Scrum', url: '/daily' },
      { title: 'Sprint Review', url: '/review' },
      { title: 'Retrospective', url: '/retrospective' },
      { title: 'Backlog Refinement', url: '/refinement' },
    ],
  },
  {
    title: 'Team',
    url: '/team',
    icon: Users2,
    items: [
      { title: 'Members', url: '/members' },
      { title: 'Roles & Permissions', url: '/roles' },
      { title: 'Capacity Planning', url: '/capacity' },
    ],
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings2,
    items: [
      { title: 'Workflow', url: '/workflow' },
      { title: 'Definitions of Done/Ready', url: '/definitions' },
      { title: 'Templates', url: '/templates' },
      { title: 'Integrations', url: '/integrations' },
    ],
  },
]

const route = useRoute()

const isActive = (url: string) => route.path === url

const isActiveWithItems = (url: string, items: Array<{ url: string }>) => {
  if (route.path === url) return true

  return items.some((item) => route.path === url + item.url)
}

const openSections = ref<Record<string, boolean>>({})

sections.forEach((section) => {
  openSections.value[section.url] = isActiveWithItems(section.url, section.items)
})

watch(
  () => route.path,
  () => {
    sections.forEach((section) => {
      openSections.value[section.url] = isActiveWithItems(section.url, section.items)
    })
  },
)
</script>

<template>
  <Sidebar collapsible="icon" side="left">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <GalleryVerticalEnd class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">Acme Inc</span>
              <span class="truncate text-xs">Enterprise</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="section in sections" :key="section.title">
              <Collapsible class="group/collapsible" v-model:open="openSections[section.url]">
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton as-child>
                    <span class="cursor-pointer">
                      <component :is="section.icon" />
                      <span>{{ section.title }}</span>
                      <ChevronRight
                        class="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90"
                      />
                    </span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent class="CollapsibleContent">
                  <SidebarMenuSub>
                    <SidebarMenuItem v-for="item in section.items" :key="item.title" as-child>
                      <SidebarMenuButton :is-active="isActive(section.url + item.url)" as-child>
                        <RouterLink :to="section.url + item.url">
                          <span>{{ item.title }}</span>
                        </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">Shadcn</span>
                  <span class="truncate text-xs">m@example.com</span>
                </div>
                <LucideChevronsUpDown class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" class="w-(--reka-popper-anchor-width)">
              <DropdownMenuItem>
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
