<script setup>
import { DatePicker as VCalendarDatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
});

const emit = defineEmits(['update:model-value', 'close']);

const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === 'dark');

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:model-value', value);
    emit('close');
  },
});

const attrs = ref([
  {
    highlight: 'red',
    // Wrap lone date range in separate array to avoid rendering as multiple dates
    dates: [[new Date(2024, 0, 2), new Date(2024, 0, 9)]],
  },
]);

/*
TODOS:

- 9től rendelhet
- szállítási napok, 1,2,5,7
*/

const disabledDates = ref([
  {
    // start: new Date(2024, 0, 2),
    // end: new Date(2024, 0, 9),
    repeat: {
      weekdays: [1, 2, 5, 7],
    },
  },
]);

// const disabledDates = ref([{ start: new Date(2024, 1, 8), end: null }]);
</script>

<template>
  <VCalendarDatePicker
    v-model="date"
    transparent
    borderless
    :attributes="attrs"
    :is-dark="isDark"
    title-position="left"
    trim-weeks
    :disabled-dates="disabledDates"
  />
</template>
