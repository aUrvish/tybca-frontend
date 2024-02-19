<script setup>
import { ref } from "vue";

const currentPage = ref(1)
</script>

<template>
  <div class="pagination">
    <vue-awesome-paginate
      :total-items="20"
      v-model="currentPage"
      :items-per-page="1"
      :max-pages-shown="3"
    >
      <template #prev-button>
          <p class="font-semibold text-gray-400">Prev</p>
      </template>

      <template #next-button>
          <p class="font-semibold text-gray-400" >Next</p>
      </template>
    </vue-awesome-paginate>
  </div>
</template>

<style>
.pagination .pagination-container {
  @apply items-center xsm:gap-2 gap-1
}
.pagination .paginate-buttons {
  @apply h-[30px] w-[30px] cursor-pointer rounded bg-transparent text-[black] xsm:text-sm text-[13px] border-[none]
}

.pagination .back-button,
.pagination .next-button {
    @apply h-[30px] w-[50px] border border-solid border-[#ccc]
}
.pagination .active-page {
    @apply bg-gray-200
}
.pagination .paginate-buttons:hover {
    @apply bg-gray-100
}
.pagination .active-page:hover {
    @apply bg-gray-300
}

.pagination .back-button:hover,
.pagination .next-button:hover {
  @apply text-gray-200
}

.pagination .back-button:active,
.pagination .next-button:active {
    @apply bg-gray-200
}
</style>