<template>
  <div>
    <b-modal
      header-class="bg-danger text-white"
      ref="my-modal"
      hide-footer
      hide-header-close
      title="登入失敗"
    >
      <div class="body">
        <div class="mb-3">
          <slot></slot>
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
      msg: ""
    };
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