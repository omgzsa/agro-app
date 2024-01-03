<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
});

const emit = defineEmits(['update:model-value']);
const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:model-value', value);
  },
});

// const date = ref(new Date());
const processingDays = ref(5);

// Calculate minDate based on processingDays
const minDate = computed(() => {
  const today = new Date();
  today.setDate(today.getDate() + processingDays.value);
  return today;
});

const disabledDates = computed(() => {
  const today = new Date();

  const untillProcessed = new Date(today);
  untillProcessed.setDate(untillProcessed.getDate() + processingDays.value);

  return [today, untillProcessed];
});

const disabledWeekDays = computed(() => {
  return [1, 2, 5, 7];
});

const format = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}/${month}/${day}`;
};

const config = {
  tabOutClosesMenu: true,
};
</script>

<template>
  <div class="w-72">
    <vue-date-picker
      v-model="date"
      placeholder="Válaszd ki a szállítási dátumot"
      :config="config"
      :min-date="minDate"
      :disabled-dates="disabledDates"
      :disabled-week-days="disabledWeekDays"
      :enable-time-picker="false"
      :format="format"
      month-name-format="long"
      locale="hu"
      select-text="Kiválaszt"
      cancel-text="Mégsem"
    />
  </div>
</template>

<style>
.dp__input {
  font-family: 'Ubuntu', sans-serif;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-left: 2.25rem;
  padding-right: 0.625rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  border-radius: 0.375rem;
  box-shadow: 0 0 0.5px #d1d5db;
  /* color: #b6b6b6; */
}
</style>
