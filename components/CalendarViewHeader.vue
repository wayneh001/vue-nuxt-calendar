<template>
  <div class="pt-5">
    <div
      class="p-3 mb-3 d-flex justify-content-between align-items-center w-100 bg-light"
    >
      <div class="d-flex align-items-center">
        <a href="#">
          <input type="text" class="form-control" placeholder="請輸入關鍵字" />
        </a>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div
          :disabled="!headerProps.previousPeriod"
          class="tab bg-light"
          @click="onInput(headerProps.previousPeriod)"
        >
          <a href="#">
            <h5 class="m-0">&lt;</h5>
          </a>
        </div>
        <div class="tab bg-light">
          <a href="#">
            <h5 class="m-0"><slot name="label" /></h5>
          </a>
        </div>
        <div
          :disabled="!headerProps.nextPeriod"
          class="tab bg-light"
          @click="onInput(headerProps.nextPeriod)"
        >
          <a href="#"> <h5 class="m-0">&gt;</h5></a>
        </div>
      </div>
      <div class="tools">
        <select v-model="displayPeriodUom">
          <option><div class="toggle">週</div></option>
          <option><div class="toggle">月</div></option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
import CalendarView from "@/components/CalendarView"
import CalendarViewHeader from "@/components/CalendarViewHeader"
export default {
  name: "CalendarViewHeader",
  components: {CalendarView, CalendarViewHeader},
  props: {
    headerProps: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onInput(d) {
      this.$emit("input", d);
    },
  },
};
</script>
<style>
.tools {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  width: 8rem;
  height: 2rem;
}

.tools a {
  text-decoration: none;
  color: #3e4044;
}

.tools a:hover {
  color: #fff;
}

.tools a:active {
  color: #fff;
}

.tools a:hover .toggle {
  background-color: #686ce5;
  color: #fff;
}

.tools a:active .toggle {
  background-color: #686ce5;
  color: #fff;
}

.tab {
  padding-left: 1em;
  padding-right: 1em;
}

.tab a {
  text-decoration: none;
  color: #3e4044;
}
</style>
