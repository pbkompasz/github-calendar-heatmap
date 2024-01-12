<template>
  <div class="pa-md-4">
    <h1>Playground</h1>
    <calendar-heatmap :values="values" :dark-mode="darkmode" :end-date="endDate" :vertical="orientation === 'vertical'"
      no-data-text="NOTHING" />

    <v-card title="Settings" class="pa-md-4 mt-md-8">
      <h4>Unit Select</h4>
      <v-text-field label="Unit" class="flex-shrink-0" v-model="unit"></v-text-field>
      <br />

      <h4>Orientation</h4>
      <v-radio-group>
        <v-radio label="Row" value="row" v-model="orientation"></v-radio>
        <v-radio label="Row reverse" value="row-reverse" v-model="orientation"></v-radio>
        <v-radio label="Vertical" value="vertical" v-model="orientation"></v-radio>
        <v-radio label="Vertical reverse" value="vertical-reverse" v-model="orientation"></v-radio>
      </v-radio-group>
      <br />

      <h4>Darkmode (manual toggle)</h4>
      <div>Note: This overwrites the system settings</div>
      <v-switch v-model="darkmode" label="Darkmode" class="flex-shrink-0"></v-switch>
      <br />

      <h4>Colors</h4>
      <div class="d-flex align-center">
        <span>Generated colors:</span>
        <div v-for="color in colors" :style="{ 'background-color': color }" class="pa-md-4 color-square"></div>
      </div>
      <div v-if="darkmode" class="d-flex flex-nowrap justify-space-evenly">
        <div class="d-inline-block">
          <span>Min color</span>
          <v-color-picker v-model="minColorDark" :modes="['rgba']"></v-color-picker>
        </div>
        <div class="d-inline-block">
          <span>Max color</span>
          <v-color-picker v-model="maxColorDark" :modes="['rgba']"></v-color-picker>
        </div>
      </div>

      <div v-else class="d-flex flex-nowrap justify-space-evenly">


        <div class="d-inline-block">
          <span>Min color</span>
          <v-color-picker v-model="minColorLight" :modes="['rgba']"></v-color-picker>
        </div>
        <div class="d-inline-block">
          <span>Max color</span>
          <v-color-picker v-model="maxColorLight" :modes="['rgba']"></v-color-picker>
        </div>
      </div>

      <!-- TODO -->
      <!-- <h4>Language</h4>
      <span>Select locale: </span>
      <select name="locale" id="locale">
        <option v-for="locale in locales" :key="locale[1]" :value="locale[1]">{{ `${locale[0]} - ${locale[1]}` }}
        </option>
      </select>

      <div class="d-flex flex-nowrap justify-space-between align-center">
        <v-switch label="Separated months" class="flex-shrink-0"></v-switch>
        <v-text-field label="Value" class="flex-shrink-0"></v-text-field>
        <v-select label="Unit" :items="['px', 'rem',]" class="flex-shrink-0"></v-select>
      </div> -->
    </v-card>


    <v-card title="Variants">

      <h4>Single line</h4>
      TBD
      <calendar-heatmap class="heatmap--disabled" :values="values" :dark-mode="darkmode" :end-date="endDate" disabled
        :vertical="orientation === 'vertical'" no-data-text="NOTHING" />
      <br />
      <h4>Contributors</h4>
      TBD
      <calendar-heatmap class="heatmap--disabled" :values="values" :dark-mode="darkmode" :end-date="endDate"
        :vertical="orientation === 'vertical'" no-data-text="NOTHING" />
      <br />
      <h4>Contributions</h4>
      TBD
      <calendar-heatmap class="heatmap--disabled" :values="values" :dark-mode="darkmode" :end-date="endDate"
        :vertical="orientation === 'vertical'" no-data-text="NOTHING" />
      <br />
    </v-card>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import { data, locales, } from './heatmap/data';
import { Heatmap } from './heatmap/heatmap';

const values = ref(data);
const endDate = ref(new Date());
const unit = ref('contributions');
const orientation = ref('row');
const minColorDark = ref(Heatmap.DEFAULT_RANGE_COLOR_DARK[0]);
const maxColorDark = ref(Heatmap.DEFAULT_RANGE_COLOR_DARK[4]);
const minColorLight = ref(Heatmap.DEFAULT_RANGE_COLOR_LIGHT[0]);
const maxColorLight = ref(Heatmap.DEFAULT_RANGE_COLOR_LIGHT[4]);
const darkmode = ref(false)
const colors = ref(Heatmap.DEFAULT_RANGE_COLOR_LIGHT)

const nav = ref(navigator)

const button = ref(null)
onMounted(() => {

})
</script>

<style lang="scss">
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

// TODO Make this work
// .heatmap {
//   &--disabled {
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     left: 0px;
//     top: 0px;
//     background-color: grey;
//     opacity: .75
//   }
// }

.color-square {
  width: 2rem;
  height: 2rem;
  display: inline-block;
  margin-right: 0.25rem;
}
</style>