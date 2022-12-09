<template>
  <div>
    <div>

      <h4>Unit Select</h4>
      <input type="radio" id="two" value="contributions" v-model="picked" />
      <label for="one">Default(contributions)</label>
      <br />
      <input type="radio" id="two" value="Da" v-model="picked" />
      <label for="two">Da</label>
      <br />
      <input type="radio" id="one" value="Dings" v-model="picked" />
      <label for="two">Dings</label>
      <br />

      <h4>Orientation</h4>
      <input type="radio" id="horizontal" value="horizontal" v-model="orientation" />
      <label for="one">Horizontal</label>
      <br />
      <input type="radio" id="vertical" value="vertical" v-model="orientation" />
      <label for="two">Vertical</label>
      <br />

      <h4>Darkmode</h4>
      <input type="checkbox" id="horizontal" value="horizontal" v-model="darkmode" />
      <label for="one">Darkmode</label>
      <br />

      <h4>Colors</h4>
      <span>Light mode: </span>
      <input type="text" v-model="lightColor">
      <br />
      <span>Dark mode: </span>
      <input type="text" v-model="darkColor">

    </div>
    <br>
    <h4>None</h4>
    <calendar-heatmap :values="[]" :end-date="endDate" :vertical="orientation === 'vertical'" :no-data-text="false" />
    <br>
    <h4>Some</h4>
    <calendar-heatmap :values="values" :end-date="endDate" :vertical="orientation === 'vertical'"
      no-data-text="NOTHING" />
    <br>
    <h4>Some (rounded corners)</h4>
    <calendar-heatmap :values="values" :end-date="endDate" :round="2" :vertical="orientation === 'vertical'" />
    <br>
    <h4>Some (circles)</h4>
    <calendar-heatmap :values="values" :end-date="endDate" :round="5" :vertical="orientation === 'vertical'" />
    <br>
    <h4>Locale</h4>
    <calendar-heatmap :values="values" :end-date="endDate" :locale="{
      months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      days: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      on: 'am',
      less: 'Weniger',
      more: 'Mehr'
    }" :vertical="orientation === 'vertical'" />
    <br>
    <h4>Tooltip Unit</h4>
    <calendar-heatmap :values="values" :end-date="endDate" :tooltip-unit="picked"
      :vertical="orientation === 'vertical'" />
    <br>
    <h4>TooltipFormatter</h4>
    <calendar-heatmap :values="values" :end-date="endDate"
      :tooltip-formatter="(c, u) => c.count ? (c.count / 3600 / 1000) + ' ' + u : 'NÖX'" no-data-text="NIX"
      :tooltip-unit="picked" :vertical="orientation === 'vertical'" />
    <br>
    <h4>
      Slots
    </h4>
    <calendar-heatmap :values="[{ date: '2022-1-22', count: 6 },]" :vertical="orientation === 'vertical'"
      :darkMode="false">
      <template #tooltip-active>
        <div>Active message</div>
      </template>
      <template #tooltip-inactive>
        <div>Inactive message</div>
      </template>
      <template #tooltip-2022-3-3>
        <div>
          Custom message on 2022-3-3 with 6 dings
        </div>
      </template>
      <template #legend-text-less>
        <button>LESS</button>
      </template>
      <template #legend-text-more>
        <button>MORE</button>
      </template>
      <template #legend-range>
        <div></div>
      </template>
      <template #day-4>
        DAY 4
      </template>
    </calendar-heatmap>
    <h4>
      Disable interaction
    </h4>
    <calendar-heatmap :values="[{ date: '2022-1-22', count: 6 },]" :vertical="orientation === 'vertical'"
      :darkMode="false" :noInteract="true">
    </calendar-heatmap>
    <h4>
      Legend orientation
    </h4>
    <calendar-heatmap :values="[{ date: '2022-1-22', count: 6 },]" :vertical="orientation === 'vertical'"
      :darkMode="false" :legendDirectionReverse="true">
    </calendar-heatmap>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GithubCalendarHeatmap from '@/components/CalendarHeatmap.vue';
import CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import { data } from './data';
import { Heatmap } from './components/Heatmap';

const values = ref(data);
const endDate = ref(new Date());
const picked = ref('contributions');
const orientation = ref('horizontal');
const hex = ref();
const darkmode = ref(false)
const lightColor = ref(Heatmap.DEFAULT_RANGE_COLOR_LIGHT[4])
const darkColor = ref(Heatmap.DEFAULT_RANGE_COLOR_DARK[4])
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12px;
}
</style>


