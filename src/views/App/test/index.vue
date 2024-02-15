<script setup >
import VueCountdown from '@chenfengyuan/vue-countdown';

const pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
}
</script>

<template>
    <div class="max-w-screen-xl mx-auto">
        <h1 class="text-[24px] font-semibold">Test</h1>

        <div class="mt-10">
            <h2 class="text-[20px] font-semibold">Active Test</h2>
            <div class="mt-3 grid grid-cols-4 gap-4">
                <div class="group: overflow-hidden group cursor-pointer relative">
                    <router-link to="#">
                        <div class="w-full bg-white rounded-lg aspect-[5/3] px-4 py-2 flex flex-col">
                            <div class="w-2 animate-ping aspect-square absolute top-2 right-3 bg-success rounded-full">
                            </div>
                            <p class="text-gray-300 text-sm group-hover:underline font-semibold">#0020</p>
                            <p class="line-clamp-2 text-lg font-semibold mt-3 text-gray-500">Examination 2023-24</p>
                            <div class="mt-auto mb-1">
                                <p
                                    class="px-2 py-1 mb-3 line-clamp-1 w-fit bg-[#FF94321A] rounded-[8px] font-medium text-sm text-[#FF9432]">
                                    Software Development</p>
                                <div class="flex justify-between items-center">
                                    <p class="text-[12px] font-semibold text-gray-400">TOTAL QUESTION : 30</p>
                                    <p class="text-[12px] font-semibold text-gray-400">TOTAL MARKS : 30</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="mt-8">
            <h2 class="text-[20px] font-semibold">Pending Test</h2>
            <div class="mt-3 grid grid-cols-4 gap-4">
                <div v-for="i in 4" class="group: overflow-hidden group cursor-pointer relative">
                    <router-link to="#">
                        <div class="w-full bg-white rounded-lg aspect-[5/3] px-4 py-2 flex flex-col">
                            <div class="flex justify-between items-center">
                                <p class="text-gray-300 text-sm group-hover:underline font-semibold">#0020</p>


                                <VueCountdown :time="24 * 24 * 60 * 60 * 1000" v-slot="{ days, hours, minutes, seconds }" class="font-semibold text-gray-400 text-[12px] text-left flex items-center gap-1">
                                    <div class="border rounded-[5px] min-w-6 px-1 text-center"> {{ pad(days) }} </div>
                                    <div class="border rounded-[5px] min-w-6 px-1 text-center"> {{ pad(hours) }} </div>
                                    <div class="border rounded-[5px] min-w-6 px-1 text-center"> {{ pad(minutes) }} </div>
                                    <div class="border rounded-[5px] min-w-6 px-1 text-center"> {{ pad(seconds) }} </div>
                                </VueCountdown>
                            </div>
                            <p class="line-clamp-2 text-lg font-semibold mt-3 text-gray-500">Examination 2023-24</p>
                            <div class="mt-auto mb-1">
                                <p
                                    class="px-2 py-1 mb-3 line-clamp-1 w-fit bg-[#FF94321A] rounded-[8px] font-medium text-sm text-[#FF9432]">
                                    Software Development</p>
                                <div class="flex justify-between items-center">
                                    <p class="text-[12px] font-semibold text-gray-400">TOTAL QUESTION : 30</p>
                                    <p class="text-[12px] font-semibold text-gray-400">TOTAL MARKS : 30</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>