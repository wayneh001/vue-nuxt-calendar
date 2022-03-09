<template>
  <div>
    <Login />
  </div>
</template>

<script>
import Login from "@/container/Login";
export default {
  name: "Index",
  layout: "layoutLogin",
  data() {
    return {
      meeting: {},
    }
  },
  components: {
    Login,
  },
};
</script>
