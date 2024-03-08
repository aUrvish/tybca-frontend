<script setup>
import UserTable from './components/UserTable.vue';
</script>

<template>
    <div class="max-w-screen-xl mx-auto">
        <div>
            <div class="border rounded-md bg-white p-4 flex items-center justify-between">
                <h1 class="text-[24px] font-semibold">Teachers</h1>
                <div>
                    <RouterLink :to="{ name : 'TeacherAdd'}" class="text-white bg-gray-950 font-medium rounded-md text-sm px-4 py-2 text-center">
                        Add Teacher
                    </RouterLink>
                </div>
            </div>

            <UserTable :max="10" />
        </div>
    </div>
</template>