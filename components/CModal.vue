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
            <div id="currentImage" class="currentImg">
              <img class="img-fluid" :src="currentImage" />
            </div>
          </div>
          <div class="col-5">
            <div
              id="dragImage"
              class="dragImage d-flex justify-content-center align-items-center mb-4"
            >
              <div>
                <div class="d-flex justify-content-center mb-2">
                  <i class="fa fas fa-cloud-arrow-up fs-1"></i>
                </div>
                <div>拖曳圖片至此，或點擊上傳圖片</div>
              </div>
            </div>
            <input class="form-control" type="file" />
          </div>
          <div class="col-12 mt-4">
            <client-only>
              <carousel items="5" loop="true" nav="true">
                <div
                  class="stockImage"
                  v-for="(item, index) in stockImages"
                  :key="index"
                  @click="setImage(item)"
                >
                  <img class="img-fluid" :src="item.url" />
                </div>
              </carousel>
            </client-only>
          </div>
        </div>
      </div>
      <div class="footer mt-5 d-flex justify-content-end">
        <button type="button" class="btn btn-light me-2" @click="hideModal">
          取消
        </button>
        <button
          type="button"
          class="btn btn-main"
          @click="confirm(currentImage)"
        >
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
      stockImages: [
        {
          url: "https://cdn.pixabay.com/photo/2021/06/24/11/18/background-6360868_960_720.png",
          editable: false,
        },
        {
          url: "https://cdn.pixabay.com/photo/2021/07/15/08/43/abstract-6467847_960_720.png",
          editable: false,
        },
        {
          url: "https://cdn.pixabay.com/photo/2021/09/15/13/28/art-6626881_960_720.png",
          editable: false,
        },
        {
          url: "https://cdn.pixabay.com/photo/2021/06/24/11/18/background-6360866_960_720.png",
          editable: false,
        },
        {
          url: "https://cdn.pixabay.com/photo/2021/06/24/11/18/background-6360865_960_720.png",
          editable: false,
        },
      ],
      currentImage: this.image,
    };
  },
  props: {
    image: "",
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    setImage(item) {
      this.currentImage = item.url;
    },
    confirm(iamge) {
      this.$emit("setImage", iamge);
      this.hideModal();
    },
  },
  mounted() {
    // console.log(this.stockImages);
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
  background-color: #fff!important;
  color: #686ce5;
}
</style>
