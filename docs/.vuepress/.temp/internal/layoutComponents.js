import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("/home/pb/code/open-source/vue3-calendar-heatmap/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("/home/pb/code/open-source/vue3-calendar-heatmap/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
