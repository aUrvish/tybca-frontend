<script setup>
import UserTable from './components/UserTable.vue';
import FilterCource from './components/FilterCource.vue';
</script>

<template>
    <div class="grid gap-4 grid-cols-4 overflow-hidden">
        <div class="col-start-1 xl:col-span-3 col-span-4">
            <div class="border rounded-md bg-white p-4 flex items-center justify-between">
                <h1 class="text-[24px] font-semibold">Students</h1>
                <div>
                    <RouterLink :to="{ name : 'StudentAdd'}" class="text-white bg-gray-950 font-medium rounded-md text-sm px-4 py-2 text-center">
                        Add Student
                    </RouterLink>
                </div>
            </div>

            <div class="mt-4 md:hidden">
                <FilterCource />
            </div>
            <UserTable :max="10" />
        </div>
        <div class="xl:block hidden">
            <FilterCource />
        </div>
    </div>
</template>