import { defineAsyncComponent } from 'vue'

export default ({ app }) => {
  app.component("Demo", defineAsyncComponent(() => import("/home/pb/code/open-source/vue3-calendar-heatmap/docs/.vuepress/components/Demo.vue"))),
  app.component("Links", defineAsyncComponent(() => import("/home/pb/code/open-source/vue3-calendar-heatmap/docs/.vuepress/components/Links.vue"))),
  app.component("CalendarHeatmap", defineAsyncComponent(() => import("/home/pb/code/open-source/vue3-calendar-heatmap/src/components/CalendarHeatmap.vue")))
}
