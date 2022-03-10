<template>
  <div>
    <select
      class="form-select"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
    >
      <option selected>{{ label }}</option>
      <option v-for="(item, index) in timeLabel" :key="index" value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: "CSelect",
  data() {
    return {
      timeLabel: [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
      ],
    };
  },
  props: {
    label: "",
    value: {
      type: String,
      default: "",
    },
  },
};
</script>
