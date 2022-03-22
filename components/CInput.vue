<template>
  <div>
    <div :class="className">
      <label class="form-label">{{ label }}</label>
      <input
        class="form-control"
        :value="value"
        @input="$emit('input', $event.target.value)"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "CInput",
  props: {
    className: "",
    label: "",
    value: {
      type: String,
      default: "",
    },
  },
};
</script>
