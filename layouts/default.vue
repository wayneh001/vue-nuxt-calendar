<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-3 mx-0">
        <div class="shadow p-3 mb-5 bg-body rounded">
          <Nuxt />
        </div>
      </div>
      <div class="col-9">
        <div class="shadow p-3 mb-5 bg-body rounded">
          <Calandar />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Calandar from "@/components/Calandar";
export default {
  component: {
    Calandar,
  },
};
</script>
