<script setup>
import Btn from '@/components/Btn.vue'
import UserTable from './components/UserTable.vue';
</script>

<template>
    <div class="max-w-screen-xl mx-auto">
        <div class="flex justify-between items-center" >
            <h1 class="text-[24px] font-semibold">Users</h1>
            <Btn class="text-white bg-gray-950 font-medium rounded-md text-sm px-4 py-2 text-center">
                Add User
            </Btn>
        </div>

        <div class="mt-4" >
            <UserTable :max="10"/>
        </div>
    </div>
</template>