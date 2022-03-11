<template>
  <div class="modal fade" tabindex="-1" id="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除 {{ item.title }}</span>
          </h5>
          <button type="button" class="btn-close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ item.title }}</strong>
          (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary">取消</button>
          <button type="button" class="btn btn-danger" @click="confirm">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {},
  },
  methods: {
    open(item) {
      $('#modal').modal("show");
      this.item = item;
    },
    confirm() {
      this.$emit("delete-item");
      $('#modal').modal("hide");
    },
  },
};
</script>
