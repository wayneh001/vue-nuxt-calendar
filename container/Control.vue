<template>
  <div>
    <div v-show="!isEdit">
      <CTable @add="openEdit" />
    </div>
    <div v-show="isEdit">
      <CForm @close="closeEdit"/>
    </div>
  </div>
</template>

<script>
import CTable from "@/components/CTable";
import CForm from "@/components/CForm";
export default {
  name: "Index",
  data() {
    return {
      isEdit: false,
      meeting: {},
    };
  },
  components: {
    CTable,
    CForm,
  },
  methods: {
    openEdit() {
      this.isEdit = true;
    },
    closeEdit() {
      this.isEdit = false;
    },
  },
};
</script>
