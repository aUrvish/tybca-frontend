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
    <section class="bg-gray-50">
        <div>
            <!-- Start coding here -->
            <div class="bg-white relative border sm:rounded-lg overflow-hidden">
                <div class="flex items-center justify-between p-4 border-b">
                    <h1 class="text-[20px] font-bold">User</h1>
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
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs border-b uppercase">
                            <tr class="[&>*]:whitespace-nowrap">
                                <th scope="col" class="px-4 py-3">
                                    <div class="cursor-pointer flex gap-1 items-center">
                                        <p>User ID</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="max-w-1.5 fill-gray-500" viewBox="0 0 320 512">
                                            <path
                                                d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
                                        </svg>
                                    </div>
                                </th>
                                <th scope="col" class="px-4 py-3">
                                    <div class="cursor-pointer flex gap-1 items-center justify-center">
                                        <p>User Name</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="max-w-1.5 fill-gray-500" viewBox="0 0 320 512">
                                            <path
                                                d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
                                        </svg>
                                    </div>
                                </th>
                                <th scope="col" class="px-4 py-3 text-center">E-Mail</th>
                                <th scope="col" class="px-4 py-3 text-center">Mobile</th>
                                <th scope="col" class="px-4 py-3 text-center">Performance</th>
                                <th scope="col" class="px-4 py-3 text-center">Status</th>
                                <th scope="col" class="px-4 py-3 flex justify-center">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="[&>*]:whitespace-nowrap border-b" v-for="i in max" :key="i">
                                <td scope="row" class="px-4 py-3">
                                    <div class="flex items-center gap-4">
                                        <div class="w-8 aspect-square overflow-hidden relative">
                                            <div
                                                class="absolute z-10 bg-success w-2.5 right-0 bottom-0 aspect-square rounded-full">
                                            </div>
                                            <img src="https://www.shutterstock.com/image-vector/woman-modern-icon-avatar-design-260nw-2358837033.jpg"
                                                class="w-full h-full object-cover rounded-full border" alt="avtar">
                                        </div>
                                        <p>#0001</p>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-center">Nitesh N Nageshri</td>
                                <td class="px-4 py-3 text-center">nitesh@gmail.com</td>
                                <td class="px-4 py-3 text-center">+91 85865 86969</td>
                                <td class="px-4 py-3 ">
                                    <div class="text-center text-success font-semibold flex justify-center items-center">

                                        12%
                                        <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            fill="none" viewBox="0 0 10 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                                        </svg>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-center">
                                    <!-- <span class="text-[12px] border text-blue rounded-md border-blue py-1 px-2" >Complete</span> -->
                                    <!-- <span class="text-[12px] border text-warning rounded-md border-warning py-1 px-2" >Pending</span> -->
                                    <span
                                        class="text-[12px] border text-success rounded-md border-success py-1 px-2">Active</span>
                                </td>

                                <td class="px-4 pl-1 py-3 relative">
                                    <div class="flex items-center justify-end gap-4">
                                        <button
                                            class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg"
                                            @click="showActionMenu(i)" v-click-outside="() => hideActionMenu(i)"
                                            type="button">
                                            <svg class="w-5 h-5 rotate-90" aria-hidden="true" fill="currentColor"
                                                viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </button>
                                        <div class="absolute z-10 w-44 bg-white border rounded-md divide-y divide-gray-100"
                                            v-show="isShowActionMenu == i" :class="10 - 3 < i ? 'bottom-full' : 'top-full'">
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
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <nav class="flex justify-between items-center space-y-0 p-4"
                    aria-label="Table navigation">
                    <span class="text-sm font-normal text-gray-500">
                        Showing
                        <span class="font-semibold text-gray-900">1-10</span>
                        of
                        <span class="font-semibold text-gray-900">1000</span>
                    </span>
                    <ul class="inline-flex items-stretch -space-x-px">
                        <li>
                            <a href="#"
                                class="flex items-center justify-center gap-1 h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span>Prev</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center justify-center gap-1 h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                <span>Next</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
    </div>
</section></template>