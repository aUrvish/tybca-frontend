<script setup>
import Btn from '@/components/Btn.vue';
import { ref } from 'vue';
const props = defineProps({
    max: {
        default: 5,
    }
})
const isShowActionMenu = ref(null)
const showActionMenu = (index) => {
    if (isShowActionMenu.value == index) {
        isShowActionMenu.value = null
        return null
    }
    isShowActionMenu.value = index
}

const hideActionMenu = (index) => {
    if (isShowActionMenu.value == index) {
        isShowActionMenu.value = null
    }
}
</script>

<template>
    <section class="bg-gray-50 pt-4">
        <div>
            <!-- Start coding here -->
            <div class="bg-white relative border sm:rounded-lg overflow-hidden">
                <div class="flex items-center justify-between p-4 border-b">
                    <h1 class="text-[20px] font-bold">Quiz</h1>
                    <div class="flex items-center gap-4" >
                        <Btn class="bg-black text-white text-sm py-1 px-2 rounded-md">Publish Result</Btn>
                        <div class="w-full sm:max-w-[200px] max-w-[150px]">
                            <form class="flex items-center">
                                <label for="simple-search" class="sr-only">Search</label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor"
                                            viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="text" id="simple-search"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2"
                                        placeholder="Search">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs border-b uppercase">
                            <tr class="[&>*]:whitespace-nowrap">
                                <th scope="col" class="pl-4 py-3">
                                    <span class="sr-only">Select</span>
                                    <div class="flex items-center">
                                        <input type="checkbox" class="h-4 w-4">
                                    </div>
                                </th>
                                <th scope="col" class="px-4 py-3">Quiz ID</th>
                                <th scope="col" class="px-4 py-3">Quiz Name</th>
                                <th scope="col" class="px-4 py-3">Cource</th>
                                <th scope="col" class="px-4 py-3 text-center">Total Marks</th>
                                <th scope="col" class="px-4 py-3 text-center">Total question</th>
                                <th scope="col" class="px-4 py-3 text-center">Status</th>
                                <th scope="col" class="px-4 py-3">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="[&>*]:whitespace-nowrap" :class="i < max ? 'border-b' : ''" v-for="i in max" :key="i">
                                <td class="pl-4 py-3">
                                    <div class="flex items-center">
                                        <input type="checkbox" class="h-4 w-4">
                                    </div>
                                </td>
                                <td scope="row" class="px-4 py-3">#0001</td>
                                <td class="px-4 py-3">Examination 2023-24</td>
                                <td class="px-4 py-3">Big Data</td>
                                <td class="px-4 py-3 text-center">30</td>
                                <td class="px-4 py-3 text-center">30</td>
                                <td class="px-4 py-3 text-center">
                                    <!-- <span class="text-[12px] border text-blue rounded-md border-blue py-1 px-2" >Complete</span> -->
                                    <!-- <span class="text-[12px] border text-warning rounded-md border-warning py-1 px-2" >Pending</span> -->
                                    <span class="text-[12px] border text-success rounded-md border-success py-1 px-2" >Active</span>
                                </td>
                                <td class="px-4 pl-1 py-3 flex items-center justify-end relative">
                                    <button
                                        class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg" @click="showActionMenu(i)" v-click-outside="() => hideActionMenu(i)"
                                        type="button">
                                        <svg class="w-5 h-5 rotate-90" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                    <div
                                        class="absolute z-10 w-44 bg-white border rounded-md divide-y divide-gray-100" v-show="isShowActionMenu == i"
                                        :class="7 - 3 < i ? 'bottom-full' : 'top-full'">
                                        <ul class="py-1 text-sm text-gray-700">
                                            <li>
                                                <a href="#" class="block py-2 px-4 hover:bg-gray-100">Show</a>
                                            </li>
                                            <li>
                                                <a href="#" class="block py-2 px-4 hover:bg-gray-100">Edit</a>
                                            </li>
                                        </ul>
                                        <div class="py-1">
                                            <a href="#"
                                                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>