<script setup >
import Donut from '@/components/Donut.vue'
import Table from '@/components/Table.vue';
import Btn from '@/components/Btn.vue'
</script>
<template>
    <div class="grid gap-4 grid-cols-4 overflow-hidden">
        <div class="col-start-1 xl:col-span-3 col-span-4">
            <div class="border rounded-md bg-white p-4 flex justify-between">
                <h1 class="text-[24px] font-semibold">Quiz</h1>
                <div>
                    <Btn class="text-white bg-gray-950 font-medium rounded-md text-sm px-4 py-2 text-center">
                        Create Quiz
                    </Btn>
                </div>
            </div>

            <div class="mt-4 md:hidden">
                <div class="p-4 border rounded-md bg-white">
                    <h5 class="text-lg font-semibold mb-4">Course</h5>

                    <div class="flex justify-between items-center gap-2 mb-6">
                        <input type="text" id="first_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                            placeholder="i.g IT" required>

                        <Btn class="text-white bg-gray-950 font-medium rounded-md text-sm px-4 py-2 text-center">
                            Add
                        </Btn>
                    </div>

                    <div class="flex items-center gap-3 flex-wrap">
                        <p
                            class="px-3 py-1.5 bg-[#BD39FC1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#BD39FC]">
                            Data Science</p>
                        <p
                            class="px-3 py-1.5 bg-[#FD3C3C1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#FD3C3C]">
                            Artificial Intelligence</p>
                        <p
                            class="px-3 py-1.5 bg-[#1F75F71A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#1F75F7]">
                            Big Data</p>
                        <p
                            class="px-3 py-1.5 bg-[#11CD0E1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#11CD0E]">
                            Cloud Computing</p>
                        <p
                            class="px-3 py-1.5 bg-[#00BFFB1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#00BFFB]">
                            Project Management</p>
                        <p
                            class="px-3 py-1.5 bg-[#0AE1A11A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#0AE1A1]">
                            Networking</p>
                        <p
                            class="px-3 py-1.5 bg-[#FF94321A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#FF9432]">
                            Software Development</p>
                    </div>
                </div>
            </div>
            <Table :max="10" />
        </div>
        <div class="xl:block hidden">
            <div class="p-4 border rounded-md bg-white">
                <h5 class="text-lg font-semibold mb-4">Course</h5>

                <div class="flex justify-between items-center gap-2 mb-6">
                    <input type="text" id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                        placeholder="i.g IT" required>

                    <Btn class="text-white bg-gray-950 font-medium rounded-md text-sm px-4 py-2 text-center">
                        Add
                    </Btn>
                </div>

                <div class="flex items-center gap-3 flex-wrap">
                    <p class="px-3 py-1.5 bg-[#BD39FC1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#BD39FC]">
                        Data Science</p>
                    <p class="px-3 py-1.5 bg-[#FD3C3C1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#FD3C3C]">
                        Artificial Intelligence</p>
                    <p class="px-3 py-1.5 bg-[#1F75F71A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#1F75F7]">
                        Big Data</p>
                    <p class="px-3 py-1.5 bg-[#11CD0E1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#11CD0E]">
                        Cloud Computing</p>
                    <p class="px-3 py-1.5 bg-[#00BFFB1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#00BFFB]">
                        Project Management</p>
                    <p class="px-3 py-1.5 bg-[#0AE1A11A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#0AE1A1]">
                        Networking</p>
                    <p class="px-3 py-1.5 bg-[#FF94321A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#FF9432]">
                        Software Development</p>
                </div>
            </div>
        </div>
    </div>
</template>