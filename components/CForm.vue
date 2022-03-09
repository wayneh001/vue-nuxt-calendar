<template>
  <div class="container pt-5 vh-100">
    <div
      class="p-3 mb-3 d-flex justify-content-between align-items-center bg-light"
    >
      <h3 class="m-0">校園餐廳改善會議</h3>
      <a href="#"><span>編輯</span></a>
    </div>
    <form>
      <div class="mb-3">
        <label class="form-label">申請人</label>
        <input type="text" class="form-control" placeholder="請輸入申請人" />
      </div>
      <div class="mb-3">
        <label class="form-label">單位</label>
        <input type="text" class="form-control" placeholder="請輸入單位" />
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <label class="form-label">聯絡電話</label>
          <input
            type="text"
            class="form-control"
            placeholder="請輸入分機號碼"
          />
        </div>
        <div class="col-6">
          <label class="form-label" placeholder="請輸入電子信箱"
            >電子信箱</label
          >
          <input type="email" class="form-control" />
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">日期</label>
        <select class="form-select">
          <option selected>請選擇日期</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="row mb-3">
        <label class="form-label">時間</label>
        <div class="col-6">
          <select class="form-select">
            <option selected>請選擇開始時間</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-6">
          <select class="form-select">
            <option selected>請選擇結束時間</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">例行會議</label>
        <div class="d-flex justify-content-between bg-light p-2">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="inlineRadio1"
              value="option1"
            />
            <label class="form-check-label" for="inlineRadio1"
              >非例行會議</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="inlineRadio2"
              value="option2"
            />
            <label class="form-check-label" for="inlineRadio2">每日</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="inlineRadio3"
              value="option3"
            />
            <label class="form-check-label" for="inlineRadio3">每週</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="inlineRadio3"
              value="option3"
            />
            <label class="form-check-label" for="inlineRadio3">每月</label>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">例行會議結束日期</label>
        <select class="form-select">
          <option selected>請選擇日期</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">底圖</label>
        <button class="btn btn-main w-100" type="button">底圖</button>
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <button class="btn btn-light w-100" type="button" @click.prevent="onCancel">取消</button>
        </div>
        <div class="col-6">
          <button class="btn btn-main w-100" type="button">儲存</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: {
    meeting: {
      title: "",
    },
  },
  methods: {
    onCancel() {
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.notice {
  background-color: #e1e3fb;
}
</style>
