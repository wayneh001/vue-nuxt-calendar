<template>
  <div>
    <b-modal
      header-class="bg-danger text-white"
      ref="my-modal"
      hide-footer
      hide-header-close
      title="刪除會議"
    >
      <div class="body" v-if="deleteable">
        <div class="mb-3">
          確定刪除<strong>{{ item.title }}</strong
          >？
        </div>
        <div v-if="item.routine !== '非例行會議'">
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
      <div class="body" v-if="!deleteable">
        <div class="mb-3">操作無效，已超過可取消預約時間。</div>
      </div>
      <div class="footer mt-5 d-flex justify-content-end">
        <button type="button" class="btn btn-light me-2" @click="hideModal">
          取消
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="confirm(item, routineMeeting)"
        >
          確定
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import GeneralMathMixin from "@/components/Methods/GeneralMathMixin";
export default {
  data() {
    return {
      deleteable: true,
      item: {},
      routineMeeting: "單次會議",
    };
  },
  mixins: [GeneralMathMixin],
  methods: {
    showModal(item) {
      this.deleteable = this.check(item);
      this.$refs["my-modal"].show();
      this.item = item;
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    confirm(item, routine) {
      if (this.deleteable === true) {
        this.$emit("confirm", item, routine);
      }
      this.hideModal();
    },
    check(item) {
      let today = this.getDateStr(this.today());
      if (item.startDate === today) {
        if (
          this.numberized(item.startTime, 0, 2) - this.today().getHours() > 2 ||
          this.numberized(item.startTime, 3, 2) - this.today().getMinutes() > 0
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
  },
};
</script>
