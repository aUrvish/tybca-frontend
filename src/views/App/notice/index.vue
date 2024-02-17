<script setup>
import Btn from '@/components/Btn.vue'
import NoticeTable from './components/NoticeTable.vue';
</script>

<template>
    <div class="max-w-screen-xl mx-auto">
        <div class="flex justify-between items-center" >
            <h1 class="text-[24px] font-semibold">Notice</h1>
            <Btn class="text-white bg-gray-950 font-medium rounded-md text-sm px-4 py-2 text-center">
                Create Notice
            </Btn>
        </div>

        <div class="mt-4" >
            <NoticeTable :max="10"/>
        </div>
    </div>
</template>