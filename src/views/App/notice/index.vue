<script setup>
import Table from '@/components/Table.vue'
import Btn from '@/components/Btn.vue'
</script>

<template>
    <div class="max-w-screen-xl mx-auto">
        <div class="flex justify-between items-center" >
            <h1 class="text-[24px] font-semibold">Notice</h1>
            <Btn class="text-white bg-gray-950 font-medium rounded-md text-sm px-5 py-2.5 text-center">
                Create Notice
            </Btn>
        </div>

        <div class="mt-10" >
            <Table :max="20"/>
        </div>
    </div>
</template>