<template>
    <slots>
      {{ displayText }}
    </slots>
</template>

<style></style>

<!-- 
  Brief
  Default behaviour is displaying `${val as Number | 'No'} ${unit}|${unit + 's'} on ${date}`
  Tooltip can be disabled
  Tooltip can displayed a string provided
  Tooltip has a default slot
-->
<script setup lang="ts">
import { computed, useSlots, toRefs, } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: null,
  },
  val: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    default: 'contribution',
  },
  date: {
    type: Date,
    required: true,
  }
});
const { text, val, unit, } = toRefs(props);

const slots = useSlots();
const displayText = computed(() => {
  if (slots.default) {
    return '';
  }
  if (text.value) {
    return text.value;
  }
  return `${val.value != 0 ? val.value : 'No'} ${unit.value}${val.value > 1 ? 's' : ''} on ${props.date.toLocaleDateString()}`;
})

</script>
