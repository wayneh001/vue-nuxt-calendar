<template>
  <div class="row mt-3">
    <div class="col-3 mx-0">
      <div class="shadow p-3 mb-5 bg-body rounded">
        <Control />
      </div>
    </div>
    <div class="col-9">
      <div class="shadow p-3 mb-5 bg-body rounded">
        <Calandar />
      </div>
    </div>
  </div>
</template>
<script>
import Control from "@/container/Control";
import Calandar from "@/container/Calandar";
export default {
  components: {
    Control, Calandar,
  },
};
</script>
