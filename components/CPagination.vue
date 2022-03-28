<template>
  <div>
    <nav class="mx-auto" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(currentPage - 1)"
            ><i class="fa fas fa-chevron-left"></i></a
          >
        </li>
        <li
          class="page-item"
          :class="{ active: currentPage === page }"
          v-for="page of totalPage"
          :key="page"
        >
          <a class="page-link" href="" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPage }">
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(currentPage + 1)"
            ><i class="fa fas fa-chevron-right"></i></a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["totalPage", "currentPage"],
  methods: {
    // 換頁
    changePage(page) {
      this.$emit("page-change", page);
    },
  },
};
</script>
<style>
/* .page-item {
  border: #686ce5;
  color: #000;
} */

.page-link {
  border: #686ce5;
  color: #000;
}

.page-link:hover {
  color: #686ce5;
}

.page-item.active .page-link {
  background-color: #686ce5;
  color: #fff;
}
</style>
