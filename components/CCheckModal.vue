<template>
  <div>
    <b-modal
      header-class="bg-danger text-white"
      ref="my-modal"
      hide-footer
      hide-header-close
      title="還有選項未填寫完成"
      v-if="formErr === ''"
    >
      <div class="body">
        <div class="mb-3">
          <span class="text-danger" v-for="key in keys" :key="key"
            ><strong>{{ key }} </strong>
          </span>
          <span>還未填寫</span>
        </div>
      </div>
      <div class="footer mt-5 d-flex justify-content-end">
        <button type="button" class="btn btn-danger" @click="hideModal">
          確定
        </button>
      </div>
    </b-modal>
    <b-modal
      header-class="bg-danger text-white"
      ref="my-modal"
      hide-footer
      hide-header-close
      title="格式填寫錯誤"
      v-if="formErr !== ''"
    >
      <div class="body" v-if="formErr !== ''">
        <div class="mb-3">
          <span class="text-danger"
            ><strong>{{ formErr }} </strong>
          </span>
        </div>
      </div>
      <div class="footer mt-5 d-flex justify-content-end">
        <button type="button" class="btn btn-danger" @click="hideModal">
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
      formErr: "",
      keys: [],
    };
  },
  methods: {
    showModal(keys, formErr) {
      this.keys = [...keys];
      this.formErr = formErr;
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
  },
};
</script>
