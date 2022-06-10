<template xmlns:slot="http://www.w3.org/1999/html">
  <div>
    <h4>Unit Select</h4>
    <div>
      <input type="radio" id="one" value="Dings" v-model="picked"/>
      <label for="one">Dings</label>
      <br/>
      <input type="radio" id="two" value="Da" v-model="picked"/>
      <label for="two">Da</label>
      <br/>
      <span>Current Unit: {{ picked }}</span><br/>
      <br/>

      <input type="radio" id="horizontal" value="horizontal" v-model="orientation"/>
      <label for="one">Horizontal</label>
      <br/>
      <input type="radio" id="vertical" value="vertical" v-model="orientation"/>
      <label for="two">Vertical</label>
    </div>
    <br>
    <h4>None</h4>
    <calendar-heatmap :values="[]" :end-date="endDate"
                      :style="{'max-width': orientation === 'vertical' ? '145px' :  '675px'}"
                      :vertical="orientation === 'vertical'" :no-data-text="false"/>
    <br>
    <h4>Furture</h4>
    <calendar-heatmap
        :values="[]"
        :end-date="endDateFuture"
        :style="{'max-width': orientation === 'vertical' ? '145px' :  '675px'}"
        :vertical="orientation === 'vertical'"
        show-future
    >
      <template v-slot:legend><div style="display: none"></div></template>

    </calendar-heatmap>
    <br>
    <h4>Some</h4>
    <calendar-heatmap
        :values="values"
        :end-date="endDate"
        :style="{'max-width': orientation === 'vertical' ? '145px' :  '675px'}"
        :vertical="orientation === 'vertical'"
        no-data-text="NOTHING"
    />
    <br>
    <h4>Some (rounded corners)</h4>
    <calendar-heatmap :values="values" :end-date="endDate"
                      :style="{'max-width': orientation === 'vertical' ? '145px' :  '675px'}" :round="2"
                      :vertical="orientation === 'vertical'"/>
    <br>
    <h4>Some (circles)</h4>
    <calendar-heatmap :values="values" :end-date="endDate"
                      :style="{'max-width': orientation === 'vertical' ? '145px' :  '675px'}" :round="5"
                      :vertical="orientation === 'vertical'"/>
    <br>
    <h4>Locale</h4>
    <calendar-heatmap :values="values" :end-date="endDate"
                      :style="{'max-width': orientation === 'vertical' ? '145px' :  '675px'}" :locale="{
			months: [ 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez' ],
			days  : [ 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa' ],
			on    : 'am',
			less  : 'Weniger',
			more  : 'Mehr'

		}" :vertical="orientation === 'vertical'"/>
    <br>
    <h4>Tooltip Unit</h4>
    <calendar-heatmap :values="values" :end-date="endDate"
                      :style="{'max-width': orientation === 'vertical' ? '145px' :  '675px'}" :tooltip-unit="picked"
                      :vertical="orientation === 'vertical'"/>
    <br>
    <h4>TooltipFormatter 2</h4>
    <calendar-heatmap
        :values="values"
        :end-date="endDate"
        :style="{'max-width': orientation === 'vertical' ? '145px' :  '675px'}"
        :tooltip-formatter="tooltipFormatter"
        no-data-text="NIX"
        :tooltip-unit="picked"
        :vertical="orientation === 'vertical'"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Vue3CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import {data} from './data';
import {Activity, CalendarItem} from "@/components/Heatmap";

export default defineComponent({
  name: 'ServeDev',
  components: {
    CalendarHeatmap,
    Vue3CalendarHeatmap
  },
  data() {
    return {
      values: data,
      endDate: new Date('2021-08-01'),
      endDateFuture: new Date('2022-08-01'),
      picked: 'Dings',
      orientation: 'horizontal'
    };
  },
  methods:{
    tooltipFormatter(c:CalendarItem, u:String): string{
      console.log(c, u)
      console.log(c.raw);
      return (c.count ? (c.count / 3600 / 1000) + ' ' + u: 'NÖX' )
    }
  }
});
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12px;
}
</style>
