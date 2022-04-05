<template>
  <div>
    <b-modal
      header-class="bg-main text-white"
      ref="my-modal"
      hide-header
      hide-footer
    >
      <div class="body">
        <div class="mb-3">
          <i class="fa fas fa-magnifying-glass"></i>
          <label class="form-label">關鍵字</label>
          <input
            type="text"
            class="form-control me-2 mb-3"
            placeholder="請輸入關鍵字"
            v-model="obj.keywords"
          />
          <div class="row">
            <div class="col-5">
              <CInput
                name="日期"
                rules="required"
                className="mb-3"
                icon="fa-calendar-days"
                label="開始日期"
                type="date"
                v-model="obj.searchStart"
              />
            </div>
            <div class="col-2 text-center">~</div>
            <div class="col-5">
              <CInput
                name="日期"
                rules="required"
                className="mb-3"
                icon="fa-calendar-days"
                label="結束日期"
                type="date"
                v-model="obj.searchEnd"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="footer mt-5 d-flex justify-content-end">
        <button type="button" class="btn btn-light me-2" @click="hideModal">
          取消
        </button>
        <button type="button" class="btn btn-main" @click="setSearch(obj)">
          確定
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import CInput from "~/components/CInput";
export default {
  data() {
    return {
      obj: this.searchObj,
    }
  },
  props: {
    searchObj: {
      type: Object,
      reuqire: true,
    },
  },
  component: { CInput },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    setSearch(searchObj) {
      this.$emit("search", searchObj);
      this.hideModal();
    },
  },
  mounted() {
    // console.log(this.searchObj); 
  },
};
</script>
<style>
.currentImg {
  width: 100%;
  height: auto;
}
.dragImage {
  width: 100%;
  height: auto;
  aspect-ratio: 3/2;
  background-color: #fff;
  border: 2px dashed #ddd;
}

.stockImage {
  cursor: pointer;
  width: 12rem;
  height: auto;
  aspect-ratio: 4/3;
}

.fa-cloud-arrow-up {
  background-color: #fff !important;
  color: #686ce5;
}
</style>
