<template>
  <div>
    <b-modal
      header-class="bg-danger text-white"
      ref="my-modal"
      hide-footer
      hide-header-close
      title="刪除會議"
    >
      <div class="body">
        <div class="mb-3">
          確定刪除<strong>{{ item.title }}</strong>？
        </div>
        <div v-if="item.routine != '非例行會議'">
          <label class="form-label">刪除單次會議或所有例行會議？</label>
          <div class="w-100"></div>
          <div class="form-check form-check-inline">
            <input
              id="single"
              class="form-check-input"
              name="single"
              type="radio"
              v-model="routineMeeting"
              value="單次會議"
            />
            <label class="form-check-label" for="single">單次會議</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="series"
              class="form-check-input"
              name="series"
              type="radio"
              v-model="routineMeeting"
              value="所有例行會議"
            />
            <label class="form-check-label" for="series">所有例行會議</label>
          </div>
        </div>
      </div>
      <div class="footer mt-5 d-flex justify-content-end">
        <button type="button" class="btn btn-light me-2" @click="hideModal">
          取消
        </button>
        <button type="button" class="btn btn-danger" @click="confirm(item)">
          確定
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {},
      routineMeeting: "單次會議",
    };
  },
  methods: {
    showModal(item) {
      this.$refs["my-modal"].show();
      this.item = item;
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    confirm(item) {
      console.log(item);
      this.$refs["my-modal"].hide();
      this.$emit("confirm", item);
    },
  },
};
</script>
