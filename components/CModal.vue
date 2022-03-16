<template>
  <div>
    <b-modal
      header-class="bg-main text-white"
      ref="my-modal"
      size="xl"
      hide-header
      hide-footer
    >
      <div class="body">
        <div class="row">
          <div class="col-12">
            <label class="form-label mb-1">當前底圖</label>
          </div>
          <div class="col-7">
            <div id="currentImage" class="currentImg bg-main"></div>
          </div>
          <div class="col-5">
            <div
              id="dragImage"
              class="dragImage d-flex justify-content-center align-items-center mb-4"
            >
              拖曳圖片至此，或點擊上傳圖片
            </div>
            <button type="button" class="btn btn-main w-100">上傳底圖</button>
          </div>
        </div>
      </div>
      <div class="footer mt-5 d-flex justify-content-end">
        <button type="button" class="btn btn-light me-2" @click="hideModal">
          取消
        </button>
        <button type="button" class="btn btn-main" @click="confirm(item)">
          確定
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
  },
};
</script>
<style>
.currentImg {
  width: 100%;
  height: auto;
  aspect-ratio: 3/2;
}
.dragImage {
  width: 100%;
  height: auto;
  aspect-ratio: 1/0.8;
  border: 2px dashed #686ce5;
}

.stockImage {
  width: 20%;
  height: auto;
  aspect-ratio: 3/2;
}
</style>
