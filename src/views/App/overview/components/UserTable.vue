<script setup>
import Btn from '@/components/Btn.vue';
import { ref } from 'vue';
const props = defineProps({
    max: {
        default: 5,
    },
    name : {
        default : "User"
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
                    <h1 class="text-[20px] font-bold">{{ name }}</h1>
                    <div class="w-full sm:max-w-[200px] max-w-[150px]">
                        <slot/>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs border-b uppercase">
                            <tr class="[&>*]:whitespace-nowrap">
                                <th scope="col" class="px-4 py-3">{{ name }} ID</th>
                                <th scope="col" class="px-4 py-3 text-center">{{ name }} Name</th>
                                <th scope="col" class="px-4 py-3 text-center">E-Mail</th>
                                <th scope="col" class="px-4 py-3 text-center">Mobile</th>
                                <th scope="col" class="px-4 py-3 text-center">Performance</th>
                                <th scope="col" class="px-4 py-3">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="[&>*]:whitespace-nowrap" :class="i < max ? 'border-b' : ''" v-for="i in max"
                                :key="i">
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

                                <td class="px-4 pl-1 py-3 relative">
                                    <div class="flex items-center justify-end">

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
                                            v-show="isShowActionMenu == i" :class="7 - 3 < i ? 'bottom-full' : 'top-full'">
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
            </div>
        </div>
    </section>
</template>