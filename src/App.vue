<template>
  <div :class="{ 'main': true, 'main--dark': darkmode }" style="width: 100%; height: 100vh">
    <div>



      <h4>Unit Select</h4>
      <input type="radio" id="two" value="contributions" v-model="picked" />
      <label for="one">Default (contributions)</label>
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

      <h4>Language</h4>
      <span>Select locale: </span>
      <select name="locale" id="locale">
        <option v-for="locale in locales" :key="locale[1]" :value="locale[1]">{{ `${locale[0]} - ${locale[1]}` }}
        </option>
      </select>


    </div>
    <h4>General Calendar</h4>
    <calendar-heatmap
      :values="values"
      :dark-mode="darkmode"
      :end-date="endDate"
      :vertical="orientation === 'vertical'"
      no-data-text="NOTHING"
    />
    <br/>

    <h4>Separated months</h4>
    <!-- <calendar-heatmap /> -->
    <br/>

    <h4>Single line</h4>
    <!-- <single-line /> -->
    <br/>
    <h4>Contributors</h4>
    <!-- <contributors /> -->
    <br/>
    <h4>Contributions</h4>
    <!-- <contributions /> -->
    <br/>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GithubCalendarHeatmap from '@/components/CalendarHeatmap.vue';
import CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import { data, locales, } from './data';
import { Heatmap } from './components/Heatmap';

const values = ref(data);
const endDate = ref(new Date());
const picked = ref('contributions');
const orientation = ref('horizontal');
const hex = ref();
const darkmode = ref(false)
const lightColor = ref(Heatmap.DEFAULT_RANGE_COLOR_LIGHT[4])
const darkColor = ref(Heatmap.DEFAULT_RANGE_COLOR_DARK[4])

const nav = ref(navigator)

const button = ref(null)
onMounted(() => {

})
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12px;
  max-width: 60%;
  margin: 0 auto;
  border-left: 1px solid;
  border-right: 1px solid;
  padding: 1rem;
}

.main--dark {
  background-color: #484f58;
}

input {
  margin: 0.5em;
}
</style>
