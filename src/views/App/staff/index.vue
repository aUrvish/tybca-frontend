<script setup >
import FilterCource from './components/FilterCource.vue'
</script>
<template>
    <div class="grid gap-4 grid-cols-4 overflow-hidden">
        <div class="col-start-1 xl:col-span-3 col-span-4">

            <div class="mb-4 md:hidden">
                <FilterCource />
            </div>
            <div class="bg-white relative border sm:rounded-lg overflow-hidden rounded-md">
                <div class="flex items-center justify-between p-4">
                    <h1 class="text-[20px] font-bold">Students</h1>
                    <div class="w-full sm:max-w-[300px] max-w-[150px]">
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
            <div class="grid 5xl:grid-cols-3 sm:grid-cols-2 gap-2 pb-4 mt-4">
                <div class="p-2 border rounded-md bg-white hover:bg-gray-100 group" v-for="i in 20" :key="i">
                    <div class="flex justify-between items-center gap-4">

                        <div class="w-14 aspect-square overflow-hidden relative">
                            <div
                                class="absolute z-10 bg-success border-2 border-white w-4 right-0 bottom-0 aspect-square rounded-full">
                            </div>
                            <img src="https://www.shutterstock.com/image-vector/woman-modern-icon-avatar-design-260nw-2358837033.jpg"
                                class="w-full h-full object-cover rounded-full border" alt="avtar">
                        </div>

                        <div class="grow flex justify-between items-start">
                            <div class="grow">
                                <p class="text-gray-400 font-semibold">Jone Deo</p>
                                <p class="text-sm text-gray-400 font-semibold group-hover:underline">#0001</p>
                            </div>
                            <div class="text-center text-success text-sm font-semibold flex justify-center items-center">
                                12%
                                <svg class="w-2.5 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 10 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <hr class="my-4 opacity-70">
                    <div class="flex items-center gap-2 flex-wrap">
                        <p class="px-2 py-1 bg-[#BD39FC1A] rounded-[8px] font-medium lg:text-sm text-[12px] text-[#BD39FC]">
                            Data Science</p>
                        <p class="px-2 py-1 bg-[#FD3C3C1A] rounded-[8px] font-medium lg:text-sm text-[12px] text-[#FD3C3C]">
                            Artificial Intelligence</p>
                        <p class="px-2 py-1 bg-[#1F75F71A] rounded-[8px] font-medium lg:text-sm text-[12px] text-[#1F75F7]">
                            Big Data</p>
                        <p class="px-2 py-1 bg-[#11CD0E1A] rounded-[8px] font-medium lg:text-sm text-[12px] text-[#11CD0E]">
                            Cloud Computing</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="xl:block hidden">
            <FilterCource />
        </div>
    </div>
</template>