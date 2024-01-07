
<script setup >
import { RouterLink } from 'vue-router';
</script>

<template>
    <header>
        <div class="px-4 py-1 flex items-center justify-between">

            <!-- logo -->
            <RouterLink :to="{ name: 'Login' }">
                <img src="../assets/svgs/logo.svg" alt="Logo">
            </RouterLink>

            <!-- login as student -->
            <RouterLink :to="{ name: 'Login' }" class="underline font-medium sm:text-base text-[13px]">
                Login as student
            </RouterLink>
        </div>
    </header>
</template>