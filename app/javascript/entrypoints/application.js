import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueDndKitPlugin from '@vue-dnd-kit/core'

import App from '~/App.vue'
import router from '~/router'
import repositoryPlugin from '~/plugins/repositories'

import '~/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueDndKitPlugin)
app.use(repositoryPlugin)

app.mount('#app')
