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
          <div class="col-7">
            <i class="fa fas fa-image"></i>
            <label class="form-label mb-1">當前底圖</label>
            <div id="currentImage" class="currentImg">
              <img class="img-fluid" :src="currentImage.dataUrl" />
            </div>
          </div>
          <div class="col-5">
            <div class="mb-1">拖曳圖片至選框，或點擊上傳圖片</div>
            <div
              class="
                dragImage
                d-flex
                justify-content-center
                align-items-center
                mb-4
              "
              ref="selectFrame"
              @drop.prevent="onDrop($event)"
              @dragover.prevent="dragover = true"
              @dragenter.prevent="dragover = true"
              @dragleave.prevent="dragover = false"
            >
              <div>
                <div class="d-flex justify-content-center mb-2">
                  <i class="fa fas fa-cloud-arrow-up fs-1"></i>
                </div>
                <div>{{ fileName }}</div>
              </div>
            </div>
            <input
              class="form-control"
              type="file"
              @input="handleFiles"
              accept="image/*"
            />
          </div>
          <div class="row d-flex justify-content-start mt-4">
            <div
              class="stockImage col-3"
              v-for="(item, index) in fetchImages()"
              :key="index"
              @click="setImage(item)"
            >
              <img class="img-fluid" :src="item.dataUrl" alt="image" />
            </div>
          </div>
          <!-- <div class="col-12 mt-4">
            <client-only>
              <carousel items="5" nav="true">
                <div
                  class="stockImage"
                  v-for="(item, index) in fetchImages()"
                  :key="index"
                  @click="setImage(item)"
                >
                  <img class="img-fluid" :src="item.dataUrl" alt="image" />
                </div>
              </carousel>
            </client-only>
          </div> -->
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
    <CAlertModal ref="alertModal" title="上傳失敗">{{ errorMsg }}</CAlertModal>
  </div>
</template>

<script>
import CAlertModal from "@/components/CAlertModal";
export default {
  data() {
    return {
      dragover: false,
      fileName: "未選擇任何檔案",
      currentImage: this.image,
      errorMsg: "",
    };
  },
  props: {
    image: {},
  },
  components: { CAlertModal },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    setImage(item) {
      this.currentImage = item;
    },
    confirm(image) {
      this.$emit("setImage", image);
      this.hideModal();
    },
    handleFiles(event) {
      // console.log(event);
      let file = event.target.files[0];
      // console.log(this.encode(file));
      this.upload(this.encode(file));
    },
    fetchImages() {
      let stockImages = this.$store.getters.stockImages;
      return stockImages;
    },
    onDrop(e) {
      // console.log(e);
      this.dragover = false;
      if (e.dataTransfer.files.length > 1) {
        this.errorMsg = "請勿拖曳超過一個檔案。";
        this.$refs.alertModal.showModal();
      } else {
        let file = e.dataTransfer.files[0];
        if (this.check(file.type) === "pass") {
          this.encode(file);
          this.upload(this.encode(file));
        }
      }
    },
    upload(file) {
      this.$store.commit("storeStockImage", file);
    },
    check(type) {
      if (!type.includes("image")) {
        this.errorMsg = "請上傳圖片格式檔案，如 .jpg 或 .png 等。";
        this.$refs.alertModal.showModal();
      } else {
        return "pass";
      }
    },
    encode(file) {
      let dataUrl;
      let image = {
        id: "",
        name: file.name,
        altName: null,
      };
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        dataUrl = e.target.result;
        image.dataUrl = dataUrl;
      };
      return image;
    },
  },
  mounted() {
    // this.fetchImages();
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
  aspect-ratio: 5/4;
  background-color: #fff;
  border: 2px dashed #ddd;
}

.stockImage {
  cursor: pointer;
  width: 8rem;
  height: auto;
  aspect-ratio: 4/3;
}

.fa-cloud-arrow-up {
  background-color: #fff !important;
  color: #686ce5;
}
</style>
