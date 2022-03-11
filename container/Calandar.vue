<template>
  <div id="app">
    <calendar-view
      :items="items"
      :show-date="showDate"
      @show-date-change="setShowDate"
      class="theme-default holiday-us-traditional holiday-us-official"
    />
  </div>
</template>
<script>
import CalendarView from "@/components/CalendarView";
export default {
  name: "Calandar",
  data: function () {
    return { showDate: new Date() };
  },
  components: {
    CalendarView,
  },
  methods: {
    setShowDate(d) {
      this.showDate = d;
    },
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>
