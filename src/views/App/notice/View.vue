<script setup>
import Notice from '@/layouts/notice.vue'
import Btn from '@/components/Btn.vue'
const pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
}
</script>
<template>
    <Notice>
        <template #bar>
            <nav class="bg-white border-b border-gray-200 sm:px-4 px-2 py-2 z-50">
                <div class="flex justify-between flex-wrap items-center">
                    <div class="flex items-center gap-2">
                        <div class="w-8 aspect-square overflow-hidden border rounded-full">
                            <!-- <img :src="getStorage + notice.user.avatar" class="object-cover w-full h-full"
                                v-if="notice.user.avatar" alt="avtar">
                            <div v-html="miniavtar(notice.user.name)" v-else class="w-full bg-white"></div> -->
                        </div>
                        <p>Jone deo</p>
                    </div>

                    <Btn class="py-1.5 px-3 bg-red-500 rounded-lg text-white text-sm flex items-center gap-2">
                        Download
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 fill-white">
                            <path
                                d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                        </svg>
                    </Btn>
                </div>
            </nav>
        </template>
        <div class="max-w-screen-xl mx-auto flex flex-col px-4 pb-4">
            <div class="grow py-4 flex-col flex justify-around relative">
                <div class="font-bold md:text-[24px] text-lg flex items-start gap-4 text-gray-500 mb-6">
                    <h1>What is the name of the largest country in the world by area?</h1>
                </div>
                <p class="md:text-base text-gray-400 font-semibold" >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, vero, aliquam dolorem modi excepturi quibusdam repudiandae quos rem alias nulla facere. Nisi quisquam dolorem culpa eum amet nam, distinctio inventore.</p>
            </div>
        </div>
    </Notice>
</template>