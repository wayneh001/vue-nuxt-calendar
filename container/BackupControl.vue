<template>
  <div>
    <div v-if="!isEdit">
      <CTable :meetings="meetings" @open="openEdit" @delete="showDeleteModal" />
    </div>
    <div v-if="isEdit">
      <CForm :meeting="meeting" @close="closeEdit" />
    </div>
    <CDeleteModal @confirm="onDelete" ref="deleteModal" />
  </div>
</template>

<script>
import CTable from "@/components/CTable";
import CForm from "@/components/CForm";
import CDeleteModal from "@/components/CDeleteModal";
export default {
  name: "Index",
  data() {
    return {
      isEdit: false,
      meetings: this.meetingLists ? [...this.meetingLists] : [],
      meeting: {},
    };
  },
  props: {
    meetingLists: {
      type: Array,
      reuqire: false,
    },
  },
  components: {
    CTable,
    CForm,
    CDeleteModal,
  },
  methods: {
    openEdit(item) {
      this.meeting = item;
      this.isEdit = true;
    },
    closeEdit(item) {
      if (item != undefined) {
        this.meeting = item;
        let index = this.meetings.findIndex(function (meeting) {
          return meeting.id == item.id;
        });
        if (this.meeting.id) {
          this.meetings[index] = item;
        } else {
          item.id = this.meetings.length.toString();
          this.meetings.push(item);
        }

        this.$emit("update", this.meetings);
      }
      this.isEdit = false;
    },
    showDeleteModal(item) {
      this.$refs.deleteModal.showModal(item);
    },
    onDelete(item) {
      if (item != undefined) {
        this.meeting = item;
        this.meetings = this.meetings.filter(function (meeting) {
          return meeting.id != item.id;
        });
        this.$emit("update", this.meetings);
      }
    }
  },
  watch: {
    meetingLists: function (newValue) {
      this.meetings = [...newValue];
    },
  },
};
</script>
