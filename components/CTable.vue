<template>
  <div class="pt-5 vh-100">
    <div
      class="p-3 mb-3 d-flex justify-content-between align-items-center bg-light"
    >
      <h3 class="m-0">我的會議</h3>
      <nuxt-link class="d-flex justify-content-end nav-link" to="index"
        >登出</nuxt-link
      >
    </div>
    <div class="notice p-3 mb-3">
      <h5>公告</h5>
      <p>本月 14 日會議室電腦系統升級，當日不開放會議預約。</p>
    </div>
    <table class="table table-striped mb-3">
      <thead>
        <tr class="bg-main">
          <th scope="col" >日期</th>
          <th scope="col" >時間</th>
          <th scope="col" >會議名稱</th>
          <th scope="col" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-column" v-for="(item, index) in mettings" :key="index">
          <td scope="row">{{ item.date }}</td>
          <td>{{ item.startTime }} ~ {{ item.endTime }}</td>
          <td>{{ item.title }}</td>
          <td class="text-center">
            <a href="#" @click="onEdit(index)"><i class="fa fas fa-pencil me-2"></i></a>
            <a href="#" @click="onDelete(index)"><i class="fa fas fa-trash-can"></i></a>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-main w-100" type="button" @click.prevent="onAdd">
      新增會議
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mettings: [
        {
          title: '總務處月會',
          date: '2022-03-02',
          startTime: '14:00',
          endTime: '16:00',
        },
        {
          title: '事務組週會',
          date: '2022-03-07',
          startTime: '09:00',
          endTime: '11:00',
        },
        {
          title: '事務組週會',
          date: '2022-03-14',
          startTime: '09:00',
          endTime: '11:00',
        },
      ]
    }
  },
  methods: {
    onEdit(uid) {
      console.log(uid);
    },
    onDelete(uid) {
      console.log(uid);
    },
    onAdd() {
      this.$router.push("/meeting");
    }
  },
};
</script>
<style scoped>
.notice {
  background-color: #e1e3fb;
}
.btn-main {
  background-color: #686ce5;
  color: #fff;
}
</style>
