<template>
  <div>
    <CTable />
  </div>
</template>

<script>
import CTable from "@/components/CTable";
export default {
  name: "Index",
  data() {
    return {
      meeting: {},
    }
  },
  components: {
    CTable,
  },
};
</script>
